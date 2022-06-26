require("dotenv").config; 
// import required packages
const EpnsSDK = require("@epnsproject/backend-sdk-staging").default;
// import required packages
const { ethers, InfuraProvider } = require("ethers");

// Define the parameters we would need in order to initialize the SDK
const  CHANNEL_PK = '0x6738da207dd8c6dc1b8b9e30671d44a2df4f19eb294d3d11f00c05af5429c995'; // the private key of the channel
const CTA = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F68.media.tumblr.com%2Ftumblr_md2z0whR3r1ru1reqo1_500.gif&f=1&nofb=1"; // the link to be used as your cta

// Initialise the SDK
(async function Main() {
    const  epnsSdk = new EpnsSDK(CHANNEL_PK);

    const pushNotificationTitle = "LSD Notification"; //the title which would appear in a push notification, usually could be a shorter version of the actual message
    const pushNotificationBody = "You got some money $$$"; //the body which would be displayed in a push notification, usually could be a shorter version of the actual message

    const notificationTitle = "You got some money $$$"; //the long version of the title which would be displayed in the dApp
    const notificationBody = `Visit the dashboard to cash your money`; // the long version of the body which would be displayed in the dApp
    // TODO: change notification title and body to suite needs

    // TODO: change recipient address to the address you wish to use to recieve notifications
    const recipientAddress = "0x66CE9c67c6C1CF90dA0d840eeD9d6Dbc6C38Fc67";

    const notificationType = 3;

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    // const provider = new ethers.providers.InfuraProvider('homestead', {
    //     projectId:process.env.PROJECT_ID,
    //     projectSecret:process.env.PROJECT_SECRET 
    // });

    // Connect to the INFURA WebSocket endpoints with a WebSocketProvider
    const providerWS = ethers.providers.InfuraProvider.getWebSocketProvider('homestead', {
        projectId:process.env.PROJECT_ID,
        projectSecret:process.env.PROJECT_SECRET 
    })
     // Connect to the INFURA HTTP endpoints
    // const providerHTTP = ethers.providers.InfuraProvider.getWebSocketProvider('homestead', {
    //     projectId:process.env.PROJECT_ID,
    //     projectSecret:process.env.PROJECT_SECRET 
    // })


    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = providerWS.getSigner()
    // const httpSigner = providerHTTP.getSigner()

    providerWS.on("block", async (blockNumber) => {
       

        // send a notification to your subscribers
        const response = await epnsSdk.sendNotification(
        recipientAddress, //the recipients of the notification
        pushNotificationTitle, // push notification title
        pushNotificationBody, //push notification body
        notificationTitle, //the title of the notification
        notificationBody, //the body of the notification
        notificationType, //1 - for broadcast, 3 - for direct message, 4 - for subset.
        CTA, //the CTA of the notification, the link which should be redirected to when they click on the notification
        );

        console.log({
            response,
            message: "Your notification has been sucesfully sent"
        });
        
    })

})
    
    
 ();