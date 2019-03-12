var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send('oke')
});

router.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'cafrotos') {
    res.send(req.query['hub.challenge']);
  }
  else res.send('Error, wrong validation token');
});

router.post("/webhook", (req, res) => {
  let data = req.body;
  console.log(data);
  let entries = data.entry;
  entries.map(entry => {
    let messages = entry.messaging;
    messages.map(message => {
      let sender = message.sender.id;
      let mess = message.message.text;
      console.log(sender, mess)
      callSendAPI(sender, mess)
    })
  })
  res.status(200).send('ok')
})

function callSendAPI(sender_psid, message) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "text": message
    }
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": "EAALTPHvvB5sBAGofyA67aTA3YoTWjCblSg6hrB7FhYkQ7OFYgeVJsdAsMZCfoqZBzYHiXrP4nrYNdlwyRBmhqrjDAG3t7v2ZAmG4t0sFCO4ajYANToWD8wLLSBNiM1DpDvbAOZBzsyrXVJh0clkmP4wUckE2L4GTw0FkZBaFR8QZDZD" },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = router;
