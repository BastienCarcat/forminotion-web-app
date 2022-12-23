import { development } from './env/development'
import { staging } from './env/staging'

export const config = {
  development: development,
  staging: staging
}['development']
