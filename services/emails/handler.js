'use strict';

const fdk = require('@serverless/fdk');

// set event gateway urls
const EVENT_GATEWAY_URL = 'http://localhost:4000';
const EVENT_GATEWAY_CONFIG_URL = 'http://localhost:4001';

// initialize event gateway
const eventGateway = fdk.eventGateway({
  url: EVENT_GATEWAY_URL,
  configurationUrl: EVENT_GATEWAY_CONFIG_URL
});

module.exports.sendWelcomeEmail = (event, context, callback) => {

  // TODO: Send email here...

  // Emit event 'email.sent'
  eventGateway
    .emit({
      event: 'email.sent',
      data: {
        "id": event.data.id,
        "name": event.data.name,
        "email": event.data.email
      }
    })
    .then(() => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({message: 'Email sent.'})
      })

    })
    .catch(err => {
      return callback({ error: err }, null);
    });
};
