const router = require("express").Router();
const userRoutes = require("./user");
const donationRoutes = require("./donation");
const searchRoutes = require("./search");

// Db routes
router.use("/users", userRoutes);
router.use("/donations", donationRoutes);
router.use("/search", searchRoutes);

module.exports = router;
