const router = require("express").Router();
const searchController = require("../../controllers/search-controller.js");

router.route("/:index")
  .post(searchController.search);

module.exports = router;
