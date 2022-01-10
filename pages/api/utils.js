import Contentstack from 'contentstack'
import ContentstackLivePreview from "@contentstack/live-preview-utils";
console.log("params", { 
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment,
  live_preview: {
    management_token: process.env.management_token,
    enable: true,
    host: 'api.contentstack.io'
  }
})
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
ContentstackLivePreview.init({enable: true, stackSdk: Stack, ssr:false});

export const onEntryChange = ContentstackLivePreview.onEntryChange;