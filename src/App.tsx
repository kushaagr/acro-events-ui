import { lazy, Suspense, useState } from 'react'
import './App.css'
// import { AppShell, Navbar, Header } from '@mantine/core';
import { Space, Button, Flex} from '@mantine/core';


import useToken from './hooks/useToken';

import CreatePostForm from './components/CreateEventPost'
const Timeline = lazy(() => import(
  /* webpackChunkName: "AcroEventTimeline" */ 
  './components/Timeline'
))
const Login = lazy(() => import(
  './Login'
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

type Tabs = 'timeline' | 'login';

function App() {
  const [tab, setTab] = useState<Tabs>('timeline');
  const [posts, setPosts] = useState<EventPost[]>([]);
  const { token, setToken } = useToken();

  return (
    <>
      <Flex>
        <Button variant='subtle' 
          onClick={(e) => setTab('login')}
          disabled={tab==='login'}
        >
          Login
        </Button>
        <Space w='xl'/>
        <Button variant='subtle'
          onClick={(e) => setTab('timeline')}
          disabled={tab==='timeline'}
        >
          Timeline
        </Button> 
      </Flex> 
      <Space h='xl' />
      {
        tab === 'login' && 
        <Suspense>
          <Login setToken={setToken}/>
        </Suspense>   
      }
      {
        tab === 'timeline' && (<>
          <h1 className="text-4xl font-semibold">Hello</h1>
          { token!==undefined && 
            <CreatePostForm
              className={'my-5'}
              setPosts={setPosts}
            />
          }
          <Suspense fallback={<div>Loading timeline...</div>}>
            <Timeline
              posts={posts}
              setPosts={setPosts}
              token={token}
            />
          </Suspense>
        </>)
      }
    </>
  )
}

export default App
