import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "./Posts";

const PORT_QUERY_SERVICE = 4002
const ENDPOINT=`http://localhost:${PORT_QUERY_SERVICE}/posts`

function ListPost() {

    const [posts,setPosts]=useState({});


    const fetchPosts= async ()=>{
        const response=await axios.get(ENDPOINT);
        setPosts(response.data);
      }
      
      useEffect(()=>{ 
        fetchPosts();
      },[])

  return (
    <div>
        <Posts posts={posts}/>
    </div>
  )
}

export default ListPost