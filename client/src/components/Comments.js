import React from 'react'


const Card = ({ content, status }) => (
  <div className="text-sm">
    {status=== "approved" ? content : status}
  </div>
);


export default function Comments({comments}) {

  const renderedComments= Object.values(comments).map(({content,id,status})=><li key={id}><Card content={content} status={status} /></li>
    )
  
  return (
      <div>
      <ul className='list-disc pl-5 m-auto w-3/5 flex flex-col justify-between m'>
     {renderedComments}
     </ul>
    </div>
  )
}
