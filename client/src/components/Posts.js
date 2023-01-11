import React from 'react'
import CommentCreate from './CommentCreate';
import ListComments from './ListComments';


const PostCard = ({ title,id,comments}) =>{
  return (
      <div className="m-2 bg-slate-300 post-card shadow-lg rounded-md p-4 ">
      <h2 className="text-lg font-bold">{title}</h2>
      <CommentCreate postId={id}/>
      <ListComments comments={comments} postId={id}/>
      </div>
  );
}


export default function Posts({posts}) {
  
  const renderedPosts= Object.values(posts).map(({title,comments,id})=><PostCard title={title} comments={comments} id={id} key={id}/>)
  
  return (
    <div className='m-auto w-3/5 flex flex-col justify-between m'>
     {renderedPosts}
    </div>
  )
}
