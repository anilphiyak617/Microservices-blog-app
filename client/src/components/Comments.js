import React from 'react'


const Card = ({ content,id}) => (
//   <ul className="m-2 post-card shadow-lg rounded-md p-4 ">
    <div className="text-sm">{content}</div>
);


export default function Comments({comments}) {

  const renderedComments= Object.values(comments).map(({content,id})=><li><Card content={content} id={id} key={id}/></li>
    )
  
  return (
      <div>
      <ul className='list-disc pl-5 m-auto w-3/5 flex flex-col justify-between m'>
     {renderedComments}
     </ul>
    </div>
  )
}
