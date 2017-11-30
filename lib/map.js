
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleMapsClient =
  require('@google/maps').createClient({
    key: GOOGLE_API_KEY
  });

module.exports = {

  getGeoPoint: (address, cb ) => {
    googleMapsClient.geocode(
      {
        address: address
      },
      (err, response) => {
        if (err) {
          cb(err,null);
        }
        else {
          cb(null, response.json.results["0"].geometry.location);
        }});
  }

}