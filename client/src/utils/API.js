import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

const searchDonations = query  => {
  const queryComponent = {
    "bool": Object.assign({
        "filter": {
          "geo_distance": {
            "distance": "1000mi",
            "location": {
              "lat": 40.5680304,
              "lon": -111.8500344
            }
          }
        }
      },
      {"must": query})
  };
  return axios.post('/api/search/feed-it-forward-donations',
    {
      "query": queryComponent,
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
};

export default {
  getDonations() {
    return axios.get('/api/donations');
  },
  searchAllDonations() {
    return searchDonations(
      {
        "match_all": {}
      }
    );
  },
  searchDonations: searchDonations
};
