import {Stack} from './api/utils'

function fetchData (contentType, entryId){
  try{
      if(entryId){
          let Query = Stack.ContentType(contentType).Entry(entryId);
          return Query.fetch()
          .then(function success(entry) {
              return entry.toJSON();
          }, function error(err) {
            console.log("Error", err);
          });
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
  const {entry} = props
  return (
    <div>
      <h1>{entry?.title}</h1>
      <p>{entry?.single_line}</p>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  if(context.query){
    Stack.livePreviewQuery(context.query)
  }
  let entry = await fetchData(process.env.content_type_uid, process.env.entry_uid);
  return { props: 
    {
      entry
    }
  }
 
}