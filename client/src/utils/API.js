import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getDonations() {
    return axios.get('/api/donations');
  },
  searchAllDonations() {
    return axios.post('/api/search/feed-it-forward-donations',
      {
        "query": {
          "bool" : {
            "must" : {
              "match_all" : {}
            },
            "filter" : {
              "geo_distance" : {
                "distance" : "1000mi",
                "location" : {
                  "lat": 40.5680304,
                  "lon": -111.8500344
                }
              }
            }
          }
        },
        "sort": [
          {
            "_geo_distance": {
              "location" : {
                "lat": 40.5680304,
                "lon": -111.8500344
              },
              "order":         "asc",
              "unit":          "mi",
              "distance_type": "arc"
            }
          }
        ],
        "aggs" : {
          "tags": {
            "terms": {"field": "tags"}
          }
        }
      });
  }
};

var byDistance = {
  "query": {
    "bool" : {
      "must" : {
        "match_all" : {}
      }
    }
  },
  "sort": [
    {
      "_geo_distance": {
        "location" : {
          "lat": 40.5680304,
          "lon": -111.8500344
        },
        "order":         "asc",
        "unit":          "mi",
        "distance_type": "arc"
      }
    }
  ]
}
