const router = require("express").Router();
const userRoutes = require("./user");
const donationRoutes = require("./donation");

// Db routes
router.use("/users", userRoutes);
router.use("/donations", donationRoutes);

module.exports = router;
