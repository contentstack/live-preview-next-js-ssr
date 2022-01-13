import Contentstack from 'contentstack'

export const Stack = Contentstack.Stack(
{ 
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment,
  live_preview: {
    management_token: process.env.management_token,
    enable: true,
    host: 'api.contentstack.io'
  }
}
)

Stack.setHost("api.contentstack.io")

