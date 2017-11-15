const router = require("express").Router();
const dbController = require("../../controllers/db-controller.js");

router.route("/:id")
  .get(dbController.findDonationById);

router.route("/")
  .get(dbController.findAllDonations)
  .post(dbController.createDonation);

module.exports = router;
