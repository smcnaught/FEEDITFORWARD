const router = require("express").Router();
const userRoutes = require("./user");
const donationRoutes = require("./donation");
const searchRoutes = require("./search");
const loginRoutes = require("./login");
// Db routes
router.use("/users", userRoutes);
router.use("/donations", donationRoutes);
router.use("/search", searchRoutes);
router.use("/login", loginRoutes);


module.exports = router;
