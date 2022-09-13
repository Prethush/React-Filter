const mongoose = require("mongoose");
const Table = require("../model/Table");

// GET TABLE DETAILS
const fetchData = async (req, res, next) => {
  try {
    const data = await Table.find();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
};

// FILTER DATA
const filterData = async (req, res, next) => {
  let stages = JSON.parse(req.query.stages);
  let status = JSON.parse(req.query.status);
  let search = req.query.search;
  search = search.toLowerCase();
  let reqObj = {};

  if (status.length === 0 && stages.length > 0) {
    reqObj = { Stage: { $in: stages } };
  }
  if (status.length > 0 && stages.length === 0) {
    reqObj = { Status: { $in: status } };
  }
  try {
    let data = await Table.find(reqObj);
    data = data.filter((d) => d.Name.toLowerCase().startsWith(search));
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchData,
  filterData,
};
