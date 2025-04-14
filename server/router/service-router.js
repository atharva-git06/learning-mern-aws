const express = require("express");
const router = express.Router();
const services = require("../controller/service-controller")

router.route("/services").get(services)

module.exports = router;