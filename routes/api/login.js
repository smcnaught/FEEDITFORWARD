const router = require("express").Router();
const dbController = require("../../controllers/db-controller.js");

router.route("/:email/:password")
  .get(dbController.login);


module.exports = router;
