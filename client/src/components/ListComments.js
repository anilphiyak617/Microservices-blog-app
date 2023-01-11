import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "./Comments";

function ListComments({postId,comments}) {

  return (
    <div>
        <Comments comments={comments}/>
    </div>
  )
}

export default ListComments