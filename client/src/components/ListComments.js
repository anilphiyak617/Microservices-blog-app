import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "./Comments";

function ListComments({postId}) {

    const [comments,setComments]=useState({});

    const ENDPOINT=`http://localhost:4001/posts/:${postId}/comments`
    const fetchComments= async ()=>{

        console.log(postId);
        const response=await axios.get(ENDPOINT);
        setComments(response.data);
        console.log(response.data);
    }

    useEffect(()=>{ 
        fetchComments();
    },[])

  return (
    <div>
        <Comments comments={comments}/>
    </div>
  )
}

export default ListComments