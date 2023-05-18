import React from 'react';
import { useState, useEffect } from 'react'

import { 
  VerticalTimeline, 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Post from './Post'



async function loadData() {
  console.log("Loading data...");
  
  let res = await fetch(
    // '/api/events'
    // 'http://localhost:8000/api/events/'
    "https://acro-events.onrender.com/api/events"
  );
  console.log("Fetched response:", res, " of type:", typeof res);
  
  let jsob = await res.json();
  console.log("Converted response stream to json.\n", 
    typeof jsob, " | ",  jsob); 
  console.log("Loading complete!");
  
  return jsob.events;
  // setTimeline(jsob.events);
}


export default function Timeline() {
  const [timeline, setTimeline] = useState([]);

  // Source : https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react#step-2-preventing-errors-on-unmounted-components
  useEffect(() => {
    let mounted = true;
    loadData().then(posts => {
      if(mounted) setTimeline(posts)
    });

    return () => { mounted = false };
  }, [])

  return <React.Fragment>
    <VerticalTimeline
      // layout='2-columns'
      layout='1-column-left'
      lineColor={'gray'}
    >
      {
        timeline.map((evn) => (
          <Post key={evn['_id']} evn={evn}/>
          // <Post key={evn.date} evn={evn}/>
        ))
      }
    </VerticalTimeline>
  </React.Fragment>
}