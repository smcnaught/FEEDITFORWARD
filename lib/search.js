const elasticsearch = require('elasticsearch');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/search.json')[env];
const INDEX = "feed-it-forward-donations";

var esClient = {};

if (config.use_env_variable) {
  esClient = null; // TODO: look at how this is configured on Heroku
} else {
  esClient = new elasticsearch.Client(config);
}

module.exports = {
  search: (searchParams, cb) => {
    esClient.search(searchParams, (err, res) => {
      if (err) {
        cb(err, null);
      }
      const results = res.hits.hits.map(result =>
        Object.assign(
          {},
          result._source,
          {distance: result.sort[0]}));
      cb(null,
        {
          results: results,
          tags: res.aggregations.tags.buckets,
          // page: pageNum,
          // pages: Math.ceil(res.hits.total / perPage)
        });
    });
  },
  indexDonation: (donation, cb) => {
    const tmp = Object.assign({}, donation);
    delete tmp.id;
    esClient.index({
        index: INDEX,
        type: "donation",
        id: donation.id,
        body: tmp
      },
      cb);
  }
}
