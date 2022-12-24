import { development } from './env/development'
import { staging } from './env/staging'
import { production } from './env/production'

export const config = {
  development: development,
  staging: staging,
  production: production
}[process.env.REACT_APP_ENVIRONMENT || 'development']
