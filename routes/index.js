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

router.post("/webhook", (req, res)=>{
  let data = req.body;
  console.log(data);
  let entries = data.entry;
  entries.map(entry => {
    let messages = entry.messaging;
    messages.map(message =>{
      let sender = message.sender.id;
      let mess = message.message.text;
      console.log(sender, mess)
    }) 
  })
  res.status(200).send('ok')
})

module.exports = router;
