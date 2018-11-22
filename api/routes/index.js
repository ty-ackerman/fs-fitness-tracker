"use strict";

const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  const message = `Let's hope this works!`;
  res.send(message);
});

exports.router = router;
