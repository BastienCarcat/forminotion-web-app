export const production = {
  baseUrl: 'https://forminotion-back.herokuapp.com/api/',
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  }
}
