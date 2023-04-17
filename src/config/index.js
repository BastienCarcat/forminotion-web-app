import { development } from './env/development'
import { staging } from './env/staging'
import { development_vercel } from './env/development-vercel'
import { production } from './env/production'

export const config = {
  development: development,
  development_vercel: development_vercel,
  staging: staging,
  production: production
}[process.env.REACT_APP_ENVIRONMENT || 'development']

// export const fetcher = (url, params) =>
//   axios.get(url, params && { params }).then((res) => res.data)
