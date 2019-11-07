// const localtunnel = require('localtunnel');

// const tunnelUrl=async () => {
//   const tunnel = await localtunnel({ port: 3001 });

//   // the assigned public url for your tunnel
//   // i.e. https://abcdefgjhij.localtunnel.me
//   return tunnel.url;
//   // console.log(tunnel.url)

//   // tunnel.on('close', () => {
//   //   // tunnels are closed
//   // });
// };

// console.log(tunnelUrl);

const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 3001 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  console.log(tunnel.url)

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();