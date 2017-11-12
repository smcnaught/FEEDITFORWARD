const router = require("express").Router();
const dbRoutes = require("./user");

// Db routes
router.use("/", dbRoutes);

module.exports = router;
