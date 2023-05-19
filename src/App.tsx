import { lazy, Suspense, useState } from 'react'
import './App.css'

import CreatePostForm from './components/CreateEventPost'
const Timeline = lazy(() => import(
  /* webpackChunkName: "AcroEventTimeline" */ 
  './components/Timeline'
))

// const evn = getevents[0];



// import getevents from './sampledata.ts';

// let ge = fetch(
//   // 'http://localhost:8000/api/events/'
//   // '/api/events'
//   "https://acro-events.onrender.com/api/events"
// ).then((res) => {
//   console.log(res, typeof res)
//   return res.json()
// }).then((jsob) => {
//   console.log(typeof jsob, jsob); 
//   return jsob;
// })
// const getevents = ((await ge).events);
// const getevents = ge.events;

// console.log("Loading complete!")
// console.log("Events: ", ge);

// console.log("type of Date field? ", getevents.date)

// http://localhost:8000

function App() {

  const [posts, setPosts] = useState<EventPost[]>([]);

  return (
    <>
      <h1 className="text-4xl font-semibold">Hello</h1>
      <CreatePostForm
        className={'my-5'}
        setPosts={setPosts}
      />
      <Suspense fallback={<div>Loading timeline...</div>}>
        <Timeline
          posts={posts}
          setPosts={setPosts}
        />
      </Suspense>
    </>
  )
}

export default App
