// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const superagent = require('superagent');

//Require Block Kits
const {homeTab_BlockKit, result_BlockKit, input_BlockKit, erro_BlockKit} = require('./blockKits.js');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Action listener function called when an interactive component with action_id of “submitCEPButton” is triggered
app.action('submitCEPButton', async ({ ack, body, client, say}) => {
  
  // Acknowledge action request before anything else
  await ack();
  
  let channelID = body.channel.id
  let userID    = body.user.id
  var cep       = body.state.values['inputBlock']['inputCEP'].value
      
  if(isValidCep(cep)){
    
    let data = await getAddressData(cep);
    
    if (typeof (data.erro) !== 'undefined'){
      
      await say({
        "blocks" : erro_BlockKit
      })
    }
    else{
      
      await say({
        "blocks" : result_BlockKit(data)
      })
    }
    
    
  }
  else{
    await client.chat.postEphemeral({
      channel: channelID,
      user: userID,
      text: `<@${userID}> ❌ CEP inválido. Verifique o CEP digitado e tente novamente.`
    });
  }
  
});

// Listen for a slash command invocation 'Busca de CEP'
app.command('/cep', async ({ command, ack, say }) => {
  
  // Acknowledge the command request
  await ack();
  
  await say({
         "blocks": input_BlockKit
    })
  
});

//Home tab
app.event('app_home_opened', async ({ event, client, context }) => {
  
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',
        
        /* body of the view */
        blocks: homeTab_BlockKit
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

// Verify if 'cep' variable is valid
function isValidCep(cep){
  
  let isnum = /^\d+$/.test(cep);
    
  if(cep.length != 8 || !isnum){
    return false
  }
  return true
}

//Make http request
async function getAddressData(cep){
    
  var url = 'https://viacep.com.br/ws/' + cep + '/json/';
  
  const response = await superagent.get(url);

  return response.body;
  
}


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
