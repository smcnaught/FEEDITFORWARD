var elasticsearch = require('elasticsearch');

var maps = require('@google/maps')

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleMapsClient =
  require('@google/maps').createClient({
    key: GOOGLE_API_KEY
  });

var client = new elasticsearch.Client(
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

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

const INDEX="feed-it-forward-donations";

client.indices.delete({
  index: INDEX
},
  function (error) {
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      console.error(`unable to delete "${INDEX}" cluster`);
    }
    else {
      console.log(`deleted the ${INDEX} cluster`)
    }
    client.indices.create(
      {
        index: INDEX,
        body: {
          "number_of_shards": 1,
          "number_of_replicas": 0
        }
      }, function (error) {
        if (error) {
          console.log(JSON.stringify(error, null, 2));
          console.error(`Unable to create ${INDEX} cluster!`);
        } else {
          console.log(`Created ${INDEX} cluster!`);
        }
        client.bulk({
          body: [
            // action description
            { index:  { _index: INDEX, _type: 'donation', _id: 1 } },
            // the document to index
            {
              name: 'mashed potatoes',
              quantity: '20 lbs',
              location: 'Chuck-A-Rama',
              address: "12344 Minuteman Dr, Draper, UT 84020",
              "location" : {
                "lat" : 41.12,
                "lon" : -71.34
              }
            },
            // action description
            { update: { _index: INDEX, _type: 'donation', _id: 2 } },
            // the document to update
            { doc: { title: 'foo' } },
            // action description
            { delete: { _index: INDEX, _type: 'donation', _id: 3 } },
            // no document needed for this delete
          ]
        }, function (err, resp) {
          // ...
        });
      });
  });

googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(JSON.stringify(response.json.results,null,2));
    console.log("location: " + JSON.stringify(response.json.results["0"].geometry.location,null,2));
  }
});
