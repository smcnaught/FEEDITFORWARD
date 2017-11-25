const db = require("../models");
const elasticsearch = require('elasticsearch');
const maps = require('@google/maps');

const INDEX = "feed-it-forward-donations";
const config = require("../config/search.json");
var env = process.env.NODE_ENV || 'development';
const client = new elasticsearch.Client(config[env]);

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleMapsClient =
  require('@google/maps').createClient({
    key: GOOGLE_API_KEY
  });

const deleteIndex = (cb) => {
  client.indices.delete(
    {index: INDEX})
    .then(response => {
      console.log(
        "delete index response: " + JSON.stringify(response, null, 2));
      console.log(`deleted the ${INDEX} cluster`);
      if (cb) {
        cb(null,response);
      }
    })
    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
      console.error(`unable to delete "${INDEX}" cluster`);
      if (cb) {
        cb(error,null);
      }
    });
};

const createIndex = (cb) => {
  client.indices.create({
    index: INDEX,
    body: {
      "number_of_shards": 1,
      "number_of_replicas": 0,
      mappings: {
        donation: {
          properties: {
            location: {
              type: "geo_point"
            },
            tags: {
              type: "keyword"
            },
            product_name: {
              type: "text"
            }
          }
        }
      }
    }
  })
    .then(response => {
      console.log(
        "create index response: " + JSON.stringify(response, null, 2));
      console.log(`deleted the ${INDEX} cluster`);
      if (cb) {
        cb(null, response);
      }
    })
    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
      console.error(`unable to create "${INDEX}" index`);
      if (cb) {
        cb(error,null);
      }
    });
};

const buildDonations = ([donation, ...remaining], results, cb) => {
  if (donation) {
    db.User.findOne({
      where: {id: donation.donorId}
    }).then((donor) => {
      const donorAddress = [
        donor.addressStreet + ",",
        donor.addressCity + ",",
        donor.addressState,
        donor.addressZip
      ].join(" ");

      googleMapsClient.geocode({
        address: donorAddress
      }, function(err, response) {
        if (err) {
          console.log(JSON.stringify(response.json.results,null,2));
        }
        else {

          console.log(JSON.stringify(response.json.results,null,2));
          console.log("location: " + JSON.stringify(response.json.results["0"].geometry.location,null,2));
          let location = response.json.results["0"].geometry.location;
          results.push({
            "id": donation.id,
            "product_name": donation.productName,
            "product_quantity": donation.productQuantity,
            "product_unit": donation.productUnit,
            "donor_id": donation.donorId,
            "receiver_id": donation.receiverId,
            "expiration": donation.expiration,
            "comments": donation.comments,
            "status": donation.status,
            "address_street": donor.addressStreet,
            "address_city": donor.addressCity,
            "address_state": donor.addressState,
            "address_zip": donor.addressZip,
            "tags": ["fruit","pie"],
            "location": {
              "lat": location.lat,
              "lon": location.lng
            }
          });
        }
        buildDonations(remaining, results, cb);
      });

    }).catch((err) => {
      console.log("error: " + JSON.stringify(err));
      buildDonations(remaining, results, cb);
    });
  }
  else {
    cb(results);
  }
}

const indexDonations = (cb) => {
  db.Donation
    .findAll({
      order: [
        ['productName', 'ASC']
      ]
    })
    .then(donations => {
      buildDonations(donations, [],
        (donationsWithDonors) => {
          const bulkOperations = donationsWithDonors.map(
            (donation) => {
              return [
                {
                  index:
                    {
                      _index: INDEX,
                      _type: 'donation',
                      _id: donation.id
                    }
                },
                donation
              ];
            }
          ).reduce((a, e) => a.concat(e),[]);
          if (bulkOperations.length > 0) {
            client.bulk({
                body: bulkOperations
              },
              cb);
          }
          else {
            cb(null,"No Donations Indexed");
          }
        });
    })
    .catch((err) => {
        console.log("ERROR: \n", JSON.stringify(err, null, 2));
        process.exit(-1);
      }
    );
}

const finalCallback = (err, resp) => {
  if (err) {
    console.log(JSON.stringify(err, null, 2));
    process.exit(-1);
  }
  else {
    console.log(JSON.stringify(resp, null, 2));
    process.exit(0);
  }
}

deleteIndex(
  (err,resp) => {
    if (!err || err.status === 404) {
      createIndex((err,resp) => {
        if (!err) {
          indexDonations(finalCallback);
        }
      });
    }});
