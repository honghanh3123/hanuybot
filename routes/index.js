var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('oke')
});

router.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'thoconyeucafrotos') {
    res.send(req.query['hub.challenge']);
  }
  else res.send('Error, wrong validation token');
});

module.exports = router;
