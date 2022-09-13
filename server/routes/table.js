const router = require("express").Router();
const { fetchData, filterData } = require("../controllers/tableController");

// fetch data
router.get("/", fetchData);

// filter data
router.get("/filter", filterData);
module.exports = router;
