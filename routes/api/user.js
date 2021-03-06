const router = require("express").Router();
const dbController = require("../../controllers/db-controller.js");

router.route("/:id")
  .get(dbController.findUserById);

router.route("/")
  .get(dbController.findAllUsers)
  .post(dbController.createUser);

module.exports = router;
