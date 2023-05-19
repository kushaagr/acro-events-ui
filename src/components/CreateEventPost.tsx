import React, { MouseEvent, useReducer } from 'react';
import StyledHeadingInput from './StyledHeadingInput'
import StyledDatePicker from './StyledDatePicker'
import StyledDescription from './StyledDescription'
import StyledImageUploader from './StyledImageUploader'
import ImageSlider from './ImageSlider'


type Action = { 
  type: string,
  newHeading?: string,
  newDescription?: string,
  newDate?: string,
  newImages?: File[],
  newUploadGlimpse?: string[]
}

type State = {
  heading: string,
  date: string,
  description: string,
  images: File[],
  uploadGlimpse: string[]
}


const initialFormState = {
  heading: '',
  date: '',
  description: '',
  images: [],
  uploadGlimpse: []
}


function reducer(state: State, action : Action) {
  switch (action.type) {
    case 'field_change': {
      return {
        heading: action.newHeading ?? state.heading,
        date: action.newDate ?? state.date,
        description: action.newDescription ?? state.description,
        images: action.newImages ?? state.images,
        uploadGlimpse: action.newUploadGlimpse ?? state.uploadGlimpse,
      }
    }
    default: {
      // throw Error('Unknown action:', action.type);
      return state;
    }
  }
}

/*
function reducer(state, action) {
  switch(action.type) {
    case 'changed_title': {
      return {
        ...state,
        heading: action.newTitle
      };
    }
    case 'changed_date': {
      return {
        ...state,
        date: action.newDate
      };
    }
    case 'changed_description': {
      return {
        ...state,
        description: action.newDescription
      };
    }
    case 'changed_images': {
      return {
        ...state,
        images: action.newImages
      };
    }
    case 'changed_upload_glimpses': {
      return {
        ...state,
        uploadGlimpse: action.newUploadGlimpse
      };
    }

    throw Error('Unknown action: ', action.type);
  }
}
*/

export default function CreatePostForm(props: {
  className: string,
  setPosts: React.Dispatch<React.SetStateAction<EventPost[]>>,
}) {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  // const [heading, setHeading] = useState('')
  // const [date, setDate] = useState('')
  // const [description, setDescription] = useState('')
  // const [images, setImages] = useState([])
  // const [glimpse, setGlimpse] = useState([])


  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const images = [];
    const previews = [];
    if (!e.target.files) 
      return;
    for (const file of e.target.files) {
      images.push(file);
      previews.push(URL.createObjectURL(file));

      console.log("Image data:", typeof file, file)
      console.log("Image URL data:", typeof URL.createObjectURL(file), URL.createObjectURL(file))
    }

    dispatch({
      type: 'field_change',
      newImages: images,
      newUploadGlimpse: previews
    })
  
    // setGlimpse(previews)
    // setImages(images)
    // dispatch({ 
    //   type: 'changed_upload_glimpses', 
    //   newUploadGlimpse: previews
    // })
    // dispatch({ 
    //   type: 'changed_images', 
    //   newImages: images
    // })

  }


  function clearFields(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.stopPropagation();
    // e.preventDefault()
    dispatch({
      type: 'field_change',
      newHeading: '',
      newDate: '',
      newDescription: '',
      newImages: [],
      newUploadGlimpse: []
    })
  
    // setHeading('')
    // setDate('')
    // setDescription('')
    // setImages([])
    // setGlimpse([])
  }


  // async function handleSubmit(e: MouseEventHandler<HTMLButtonElement, MouseEvent>) {
  async function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    const form = new FormData()
    form.append('title', formState.heading);
    form.append('date', formState.date);
    // Convert images to required format
    // form.append('images', formState.images)
    formState.images.forEach((imgObj) => form.append('images', imgObj))
    form.append('description', formState.description)
    // const data = new URLSearchParams(form)
    const data = form
    console.log("Acquired data:", data)
    // const res = await fetch('/api/events', {
    const res = await fetch('https://acro-events.onrender.com/api/events', {
      method: 'post',
      body: data,
    })
    console.log("Sent and recieved this:", res)
    const resData = await res.json();
    if (resData.success) {
      props.setPosts((posts) => [resData.event, ...posts]);
      clearFields();
    }
  }

  const buttonStyles = "rounded bg-blue-500 px-4 py-2 shadow-lg "
    + "hover:bg-blue-700 border-b-4 border-blue-800 text-white font-bold "
    + "scale-100 transition-transform hover:border-green-500 active:scale-90"

  return <React.Fragment>
    
    <form 
      className={"rounded-xl bg-white shadow-lg p-5" 
        + " " + props.className}
    >

      <ul>
        <li>
          <StyledDatePicker 
            nameProp={'date'}
            valueProp={formState.date}
            // onChangeProp={(e) => setDate(e.target.value)}
            onChangeProp={(e : React.ChangeEvent<HTMLInputElement>) => 
              dispatch({
                type: 'field_change',
                newDate: e.target.value
              })}
          >When did the event start?*</StyledDatePicker>
        </li>   

        <li>
          <StyledHeadingInput
            nameProp={'title'}
            valueProp={formState.heading}
            placeholderProp={'Event Title?*'}
            // onChangeProp={(e) => setHeading(e.target.value)}
            onChangeProp={(e : React.ChangeEvent<HTMLInputElement>) => 
              dispatch({
                type: 'field_change',
                newHeading: e.target.value
              })}

          />
        </li>

        <li>
          <StyledImageUploader
            id=""
            nameProp='images'
            valueProp={formState.images}
            // onChangeProp={(e) => setImages(e.target.files)}
            onChangeProp={handleImages}
          >Upload images</StyledImageUploader>
        </li>   

        <li>
          <ImageSlider data={formState.uploadGlimpse}/>
        </li>
        
        <li>
          <StyledDescription
            nameProp={'description'}
            valueProp={formState.description}
            // onChangeProp={(e) => setDescription}
            onChangeProp={(e : React.ChangeEvent<HTMLInputElement>) => 
              dispatch({
                type: 'field_change',
                newDescription: e.target.value
              })}
          >Describe your event...</StyledDescription>
        </li>   

        {/*{ 
          evn.images.length !== 0 && 
          <ImageSlider data={evn.images} isEditing={isEditing}/> 
        }*/}


        <li className="flex justify-start gap-10 my-2">
          <button 
            type="submit" 
            className={buttonStyles}
            onClick={handleSubmit}
          >Submit</button>
          <button 
            className={buttonStyles} 
            onClick={clearFields}
          >Reset</button>
        </li>
      </ul>
    </form>

  </React.Fragment>
}