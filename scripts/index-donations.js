const db = require("../models");
const elasticsearch = require('elasticsearch');
const INDEX = "feed-it-forward-donations";

const client = new elasticsearch.Client(
  {
    host: [
      {
        host: 'localhost',
        auth: 'elastic:changeme',
        protocol: 'http',
        port: 9200
      }
    ]
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
}

const createIndex = (cb) => {
  client.indices.create({
    index: INDEX,
    body: {
      "number_of_shards": 1,
      "number_of_replicas": 0
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
}

const buildDonations = ([donation, ...remaining], results, cb) => {
  if (donation) {
    db.User.findOne({
      where: {id: donation.donorId}
    }).then((donor) => {
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
        "address_zip": donor.addressZip
      });
      buildDonations(remaining, results, cb);
    }).catch((err) => {
      console.log("error: " + JSON.stringify(err));
      buildDonations(remaining, results, cb);
    })
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
                      _type: 'mytype',
                      _id: donation.id
                    }
                },
                donation
              ]
            }
          ).reduce((a, e) => a.concat(e));

          client.bulk({
              body: bulkOperations
            },
            cb);
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
    if (!err) {
      createIndex((err,resp) => {
        if (!err) {
          indexDonations(finalCallback);
        }
      });
    }});
