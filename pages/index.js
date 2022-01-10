import Contentstack from "contentstack"
import { useEffect } from "react";
// import Contentstack from 'contentstack'

const Stack = Contentstack.Stack(
 {
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment
 }
);

function fetchData (contentType, entryId){
  try{
      if(entryId){
          let Query = Stack.ContentType(contentType).Entry(entryId);
          let entry = Query.fetch()
          .then(function success(entry) {
              return entry.toJSON();
          }, function error(err) {
            console.log("Error", err);
          });
          return entry;
      }
      else{
          let Query = Stack.ContentType(contentType).Query();
          let entry = Query.toJSON().find();
          return entry;
      }

  }
  catch(err){
      console.log(err);
  }
 
}

export default function Home(props) {
  console.log("PROPS", props)
  useEffect(() => {
    //initializing live preview when the page renders for the first time.
    window.parent.postMessage(
      {
          from: "live-preview",
          type: "init",
          data: {
              config: {
                  shouldReload: false,
                  href: window.location.href,
              },
          },
      },
      "*"
  );
  //listening to post messages for the hash value
  window.addEventListener("message", async (e) => {
    console.log("Event:",e) 
    if(e.data){
      console.log("DATA". e.data)
    } 
  });
  }, [])
  return (
    <div>
      <h1>SSR Rendering</h1>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let entry = await fetchData("ashwini_rte", "blt69a28688604b9027");
  return { props: 
    {...entry} 
  }
 
}