const axios = require('axios');

var instance = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

instance.post(
  '/users',
  {
    "firstName": "Chuck",
    "lastName": "Rama",
    "organization": "Chuck O'Rama",
    "addressStreet": "12344 Minuteman Dr",
    "addressCity": "Draper",
    "addressState": "UT",
    "addressZip": "84020",
    "type": "donor",
    "email": "chucka@rama.com",
    "phone": "(555) 555-5555"
  }
).then(function (response) {
  console.log(response);
  process.exit(0);
})
  .catch(function (error) {
    console.log(error);
    process.exit(-1);
  }
);

