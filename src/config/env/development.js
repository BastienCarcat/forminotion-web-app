export const development = {
  apiUrl: 'http://localhost:8080/api/',
  appUrl: 'http://localhost:3000/',
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  }
}
