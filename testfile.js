/**
 * Simple JavaScript example demonstrating authentication with private WebSockets channels.
 */

 const { DydxClient } = require('@dydxprotocol/v3-client')
 const Web3 = require('web3')
 const WebSocket = require('ws')
 
 const HTTP_HOST = 'https://api.stage.dydx.exchange'
 const WS_HOST = 'wss://api.stage.dydx.exchange/v3/ws'
 
 // NOTE: Set up web3 however your prefer to authenticate to your Ethereum account.
 web3 = new Web3()
 web3.eth.accounts.wallet.add("Private KEY ")
 ;((async () => {
 const address =  '0xE0E24a32A7e50Ea1c7881c54bfC1934e9b50B520'
   client = new DydxClient(HTTP_HOST, { web3 })
   const apiCreds = await client.onboarding.recoverDefaultApiCredentials(address)
   client.apiKeyCredentials = apiCreds
   const apiCredentials = await client.onboarding.recoverDefaultApiCredentials(
  address
  );
   const timestamp = new Date().toISOString()
   const signature = client.private.sign({
     requestPath: '/ws/v3/orderbook/:market',
     method: 'GET',
     isoTimestamp: timestamp,
   })

  //    const signature = client.private.sign({
  //    requestPath: '/ws/accounts',
  //    method: 'GET',
  //    isoTimestamp: timestamp,
  //  })
   
  //  console.log('this is api key',apiCreds.apiKey)
  //  const msg = {
  //    type: 'subscribe',
  //    channel: 'v3_accounts',
  //    accountNumber: '0',
  //    apiKey: "feac35f2-907d-1a2a-eba8-a54deeddde7a",
  //    signature,
  //    timestamp,
  //    passphrase: 'R9BsxCkYV2H2Z6Za7_ue'
  //  }
  //   const msg = {
  //    type: 'subscribe',
  //    channel: 'v3_orderbook',
  //    id:'BTC-USD'
  //  }

//  const signature = client.private.sign({
//      requestPath: '/v3/orders',
//      method: 'POST',
//      isoTimestamp: timestamp,
//    })
  const order = await client.private.createOrder(
    {
      side: "SELL",
      type:"LIMIT",
      timeInForce: "GTT",
      postOnly: false,
      size: '100',
      price: '18000',
      limitFee: '0.015',
      expiration: '2022-12-21T21:30:20.200Z',
    },
    '1', // required for creating the order signature
  );
   const ws = new WebSocket(WS_HOST)
 
   ws.on('message', (message) => {
     console.log('<', message)
   })
 
   ws.on('open', () => {
     console.log('>', msg)
     ws.send(JSON.stringify(msg))
   })
 
   ws.on('error', (error) => {
     console.log('<', error)
   })
 
   ws.on('close', () => {
     console.log('Connection closed')
   })
 
 })()).then(() => console.log('Done')).catch(console.error)
