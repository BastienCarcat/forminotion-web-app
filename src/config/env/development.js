export const development = {
  apiUrl: 'http://localhost:8080/api/',
  appUrl: 'https://forminotion-web-app-develop.vercel.app/',
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  }
}
