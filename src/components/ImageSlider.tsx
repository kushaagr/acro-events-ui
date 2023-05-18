import React from 'react';

export default function ImageSlider({data}) {
  console.log("Received data =", data, typeof data)
  return (
    <div className="w-full min-h-min py-2 flex overflow-x-auto">
      {data.map((imgurl) => {
        return <img 
          key={imgurl}
          src={imgurl} 
          className="w-8 h-8 object-cover mx-2"/>
      })}
    </div>
)}