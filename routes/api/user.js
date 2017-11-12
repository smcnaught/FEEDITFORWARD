const router = require("express").Router();
const dbController = require("../../controllers/db-controller.js");

router.route("/users/:id")
  .get(dbController.findUserById);

router.route("/users")
  .get(dbController.findAllUsers)
  .post(dbController.createUser);

module.exports = router;
