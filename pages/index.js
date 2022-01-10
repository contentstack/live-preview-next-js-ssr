import Contentstack from "contentstack"
import { useEffect, useState } from "react";

let apiUrl = `https://api.contentstack.io/v3/content_types/ashwini_live_preview/entries/blt8a69169a533e195a?`
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
  const [entry, setEntry] = useState(props['single_line'])
  // const {title, single_line, multi_line, paragraph_1, paragraph_2, paragraph_3, file} = entry

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
    const {data, from, type} = e.data
    //check for change in data
    if(data?.hasOwnProperty('hash') && from === "live-preview" && type === "client-data-send"){
      //making an api call with the hash generated and content type uid
      let res = await fetch(`${apiUrl}live_preview=${data['hash']}&content_type_uid=${data['content_type_uid']}`, {
        headers: {
          api_key: process.env.api_key,
          access_token: process.env.delivery_token
        }
      })
      let entryData = await res.json()
      console.log("Fetching changed data", entryData)
      //changing the states based on the data changed for that particular hash and rendering the same
      if(entryData){
        setEntry(entryData.entry)
      }
    }
  });
  }, [])
  return (
    <div>
      <h1>{entry}</h1>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let entry = await fetchData("ashwini_live_preview", "blt8a69169a533e195a");
  return { props: 
    {...entry} 
  }
 
}