export const production = {
  apiUrl: 'https://forminotion-server.up.railway.app/api/',
  appUrl: 'https://www.forminotion.com/',
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  }
}
