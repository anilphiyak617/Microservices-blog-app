import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "./Posts";

function ListPost() {

    const [posts,setPosts]=useState({});

    const ENDPOINT="http://localhost:4002/posts"
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