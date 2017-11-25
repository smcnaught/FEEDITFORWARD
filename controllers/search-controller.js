const elasticsearch = require('elasticsearch');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/search.json')[env];

var esClient={};

if (config.use_env_variable) {
  esClient = null; // TODO: look at how this is configured on Heroku
} else {
  esClient = new elasticsearch.Client(config);
}

module.exports = {
  search: (request, response) => {
    var body  = request.body;
    var index = request.params.index;
    var pageNum = 0;
    var perPage = 5;
    // var pageNum = request.params.page;
    // var perPage = request.params.per_page;
    // var userQuery = request.params.search_query;
    // var userId = request.session.userId;

    var searchParams = {
      index: index,
      // from: (pageNum - 1) * perPage,
      // size: perPage,
      body: body
    };

    esClient.search(searchParams, function (err, res) {
      if (err) {
        // handle error
        throw err;
      }

      response.json({
        results: res.hits.hits,
        tags: res.aggregations.tags.buckets,
        page: pageNum,
        pages: Math.ceil(res.hits.total / perPage)
      });
    });
  }
}