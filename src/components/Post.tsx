import React from 'react'
import { useState } from 'react'
import { 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import Carousel from './Carousel'
import './Post.css'

export default function Post({evn, gIsEdting, gSetIsEditing}) {
  const [isEditing, setIsEditing] = useState(false)
  const [heading, setHeading] = useState(evn.title)
  const [date, setDate] = useState(
    (new Date(evn.date))
    // .toLocaleDateString('en-us')
    .toISOString().split('T')[0]
  )

  // console.log("Evn.date", evn.date)

  // Curried function
  function handleChange(fn) {
    return (e) => fn(e.target.value)
  }


  const editingTemplate = (
    <>
      <form action="">
        {/*<div className="date">{(new Date(evn.date)).toDateString()}</div>*/}
        <input 
          type="date" 
          className="date-picker" 
          onChange={handleChange(setDate)}
          value={date}
        />
        { console.log("Initial date value:", date) }
        {/*{console.log("Date", (new Date(evn.date)).toLocaleDateString('en-us'))}*/}
        <input 
          type="text" 
          value={heading} 
          onChange={handleChange(setHeading)}
          className="title-area"/>
        { 
          evn.images.length !== 0 && 
          <Carousel data={evn.images} isEditing={isEditing}/> 
        }
        <label className="upload-button" htmlFor="files" >Upload Images</label>
        <input 
          id="files" 
          name="memories"
          className="visually-hidden"
          type="file" 
          multiple 
          accept="image/*"
        />
        <label htmlFor="description">Want to describe the event?</label>
        <textarea name="description" 
          id="description" 
          cols="30" rows="10">{evn.description}</textarea>
        <button onClick={() => setIsEditing(!isEditing)}>Save</button>
        <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
        <button onClick={() => setIsEditing(!isEditing)}>Delete post</button>
      </form>
    </>);


  const editTemplate = (
    <>
      <div className="date">{(new Date(date)).toDateString()}</div>
      <h2 className="title">{evn.title}</h2>
      { 
        evn.images.length !== 0 && 
        <Carousel data={evn.images} isEditing={isEditing}/> 
      }
      <p>{evn.description}</p>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>

    </>);

  const viewTemplate = (
    <React.Fragment>
      
      <div className="date">{(new Date(date)).toDateString()}</div>
      <h2 className="title">{evn.title}</h2>
      { 
        evn.images.length !== 0 && 
        <Carousel data={evn.images} isEditing={isEditing}/> 
      }
      <p>{evn.description}</p>

    </React.Fragment>
  )
  
  
  return <VerticalTimelineElement 
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      className="vertical-timeline-element--work"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // date="2011"
    >

    {isEditing ? editingTemplate : editTemplate}
  </VerticalTimelineElement>
}