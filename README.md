# IBM Watson Assistant 'Securing the Chatbot' Demo

https://cloud.ibm.com/docs/assistant?topic=assistant-web-chat-security

## Steps to test:
1. Run `npm install` in the project directory in order to install the necessary modules.
2. Start the Node.js server `node server.js`
3. Open your browser and go to `localhost:8000/flower`. 
4. Click on the chatbot icon on the bottom right. If the chatbot works, you are good to go.

## Walkthrough:

### `server.js`
This script has two responsibilities. First of all, the function `mocklogin()` generates a [JWT](https://jwt.io/) and signs it using a pre-generated private which you can find under the `key` directory. The corresponding public key needs to be uploaded to the integration settings on the IBM Watson Assistant dashboard under the 'Security' tab. Make sure the formats for the private and public keys are the same as the ones provided in the repo as they only seem to work this way. More information about the generated JWT and the payload content can be found [here](https://cloud.ibm.com/docs/assistant?topic=assistant-web-chat-security#web-chat-security-prereq).

For the second part of the script, which is the web server, we used the BA-HPC homepage (`index.html`) after deploying our chatbot on it using webchat. The JWT generated in the previous step is passed to this page using [EJS](https://ejs.co/).

### `index.html`
This is the plain HTML file for the BA HPC homepage. We are only interested in the following `<script>` tag which contains the options for our chatbot's deployment.
```
<script>
        console.log('<%= jwt %>')
        window.watsonAssistantChatOptions = {
        integrationID: "XXXX", // The ID of this integration.
        region: "XX-XX", // The region your integration is hosted in.
        serviceInstanceID: "XXXX", // The ID of your service instance.
        identityToken:"<%= jwt %>",
        onLoad: function(instance) {
    instance.render();
  }
};
    setTimeout(function(){
      const t=document.createElement('script');
      t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js"
      document.head.appendChild(t);
    });
  </script>
  ```
  The JWT that we generated is added to the `identityToken` option, which is the only line that we need to add manually. The rest is generated automatically and can be found in 'Embed' tab of the integration options on your IBM Watson Assistant instance dashboard.
