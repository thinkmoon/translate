var express = require('express');
var router = express.Router();
var canvas = require('../my_module/myCanvas');
var url = require("url");
var Font = canvas.showFont();
/* GET home page. */
router.get('/', function (req, res, next) {
  var params = url.parse(req.url, true).query;
  var str = params.str + '\r', site = params.site;
  if (typeof (str) != 'undefined' && typeof (site) != 'undefined') {
    canvas.generateDisplay(str, site, res);
  }
  else {
    next();
  }
});
router.get('/', function (req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(JSON.stringify(Font));
});

module.exports = router;
