const router = require("express").Router();
const dbController = require("../../controllers/db-controller.js");

router.route("/:id")
  .get(dbController.findDonationById);

router.route("/")
  .get(dbController.findAllDonations)
  .post(dbController.createDonation);

router.route("/user/:userId/item/:itemId")
	.put(dbController.reserveItem);

router.route('/unreserve/:itemId')
	.put(dbController.unreserveItem);

module.exports = router;
