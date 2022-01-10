import Contentstack from "contentstack"
import { useEffect, useState } from "react";
import { onEntryChange } from "./api/utils";


// let apiUrl = `https://api.contentstack.io/v3/content_types/ashwini_live_preview/entries/blt8a69169a533e195a?`
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
  const [entry, setEntry] = useState(props)

  const updatedData = async() => {
    let updatedEntry = await fetchData("ashwini_live_preview", "blt8a69169a533e195a")
    setEntry(updatedEntry)
  }

  useEffect(() => {
    onEntryChange(updatedData)
  }, [])
  console.log("updated entry", entry)
  return (
    <div>
      <h1>{"HELLO WORLD"}</h1>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let entry = await fetchData("ashwini_live_preview", "blt8a69169a533e195a");
  return { props: 
    {...entry} 
  }
 
}