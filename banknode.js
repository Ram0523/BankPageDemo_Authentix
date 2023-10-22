const ethers = require('ethers');
const http = require('http');

// Replace with your Ethereum node URL and contract address
const ethereumNodeUrl = 'https://sepolia.infura.io/v3/dc85879f7b534b6091b88afe023bad23'; // Ethereum node URL
const contractAddress = '0x8CB70A4cdAe2964f5Abb648bff99Ce3DA4CE7061'; // Contract address

// Initialize the Ethereum provider and contract
const provider = new ethers.JsonRpcProvider(ethereumNodeUrl);
const contractAbi = require('./contractABI.json');
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Event to listen for
const eventName = 'requestStatus';


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

let receivedTxnhash = '';
let receivedOriginID = '';
let recievedCheckAdd = '';
let frontendRes = '';  // Reponse object for frontend 
let backendRes = ''; // Response object for sender server 
const server = http.createServer((req, res) => {
  // Add CORS headers
  res.writeHead(200, corsHeaders);

  if (req.method === 'OPTIONS') {
    // Handle preflight requests (OPTIONS)
    res.end();
  } else if (req.method === 'POST') {
    if (req.url === '/from-frontend') {
      // This POST request comes from the frontend
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        try {
          const message = JSON.parse(data);
          receivedTxnhash = message.txnHash;
          receivedOriginID = message.originID;
          recievedCheckAdd = message.checkAdd;
          console.log(receivedTxnhash," ",receivedOriginID, " ",recievedCheckAdd);
          frontendRes = res;
          // frontendRes.writeHead(200, corsHeaders);
          // frontendRes.end(JSON.stringify('Received parameters from frontend.'));
        } catch (error) {
          console.error('Error parsing message from frontend:', error);
          res.writeHead(400);
          res.end('Bad Request');
        }
      });
    } else if (req.url === '/authentix') {
      // This POST request comes from server B
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        try {
          const message = JSON.parse(data);
          backendRes = res;

          const responseToSender = {
            status: 'delivered',
            message: 'Response has been succesffuly delivered to origin',
          };
    
          backendRes.writeHead(200, corsHeaders);
          backendRes.end(JSON.stringify(responseToSender));

          handleMessage(message); // Pass the response object to the handleMessage function
        } catch (error) {
          console.error('Error parsing message from server B:', error);
          res.writeHead(400);
          res.end('Bad Request');
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
});

// Listen on a specific port for incoming messages from server B
const port = 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Function to handle incoming messages
function handleMessage(message) {
  console.log('Received message:', message);
  console.log('frontend data:', receivedTxnhash, " ", receivedOriginID, " ",recievedCheckAdd);

  if (message.txnHash && message.originID && message.responseCode && message.checkAdd) {
    // Check if received txnhash and originID match the ones from the frontend call
    if (message.checkAdd == recievedCheckAdd && message.txnHash == receivedTxnhash && message.originID == receivedOriginID && (message.responseCode == "403" || message.responseCode == "404")) {
      // Handle the message here as needed
      // For demonstration purposes, we'll just log the message
      console.log('Message content:', message);

      // Respond to the message (you can customize this part)
      // For demonstration purposes, we'll send a response back to the frontend
      // Replace this with your actual logic to send a response to the frontend
      const responseToClient = {
        status: 'success',
        message: 'Message processed successfully',
        response: message.responseCode,
      };

      // Respond to the frontend
      frontendRes.writeHead(200, corsHeaders);
      frontendRes.end(JSON.stringify(responseToClient));

    }
  }
}

// Listen for the event from the smart contract
contract.on(eventName, (checkAdd, txnHash, originID, responseCode, event) => {
  console.log(`Smart contract event received: add=${checkAdd}, txnhash=${txnHash}, responsecode=${responseCode}, originID=${originID}`);

  // Check if received txnhash and originID match the ones from the frontend call
  if (checkAdd == recievedCheckAdd && txnHash == receivedTxnhash && originID == receivedOriginID && responseCode == '202') {
    // Handle the event as needed
    // For demonstration purposes, we'll just log the event

    // Respond to the event (you can customize this part)
    // For demonstration purposes, we'll send a response back to the frontend
    // Replace this with your actual logic to send a response to the frontend
    const responseToClient = {
      status: 'success',
      message: 'Smart contract event processed successfully',
      response: responseCode,
    };

    // console.log(responseToClient);
    // Respond to the frontend
    frontendRes.writeHead(200, corsHeaders);
    frontendRes.end(JSON.stringify(responseToClient));
  }
});