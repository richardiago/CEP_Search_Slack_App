Brazilian Postal Code Slack App
===============================

This is just a POC of how to create a simple Slack app using Bolt framework.

This app shows an input field where user can type a CEP (brazilian postal code) and receive the complete address.

This app uses the [viaCEP](https://viacep.com.br/) API to get address data.

This app was developed using [Glitch](https://glitch.com) plataform.


Project
------------

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server. It's where you'll add your app's listeners.
- `.env` is where you'll put your Slack app's authorization token and signing secret.
- The `examples/` folder contains a couple of other sample apps that you can peruse to your liking. They show off a few platform features that your app may want to use.

