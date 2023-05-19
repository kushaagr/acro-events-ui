import React, { useState } from 'react'
import { 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import Carousel from './Carousel'
import StyledImageUploader from './StyledImageUploader'
import './Post.css'
import ImageSlider from './ImageSlider';


const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];

export default function Post({ evn, removePost } : {
  evn: EventPost,
  removePost: (_id: string) => void,
}) {

  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState(evn);
  const [copyState, setCopyState] = useState(evn);

	const [images, setImages] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);

	const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {

		const images = [], previews = [];
		for (const file of e.target.files ?? []) {
			images.push(file);
			previews.push(URL.createObjectURL(file));
		}
		setImages(images);
		setPreviews(previews);
	};

  const removeImage = (_id: string) => setFormState({
    ...formState,
    images: formState.images.filter(image => image._id !== _id),
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) {
    return setFormState((formState) => ({
      ...formState,
      [field]: e.target.value,
    }));
  }

  const onSubmit = async (e: React.SyntheticEvent) => {

    e.preventDefault()

    const form = new FormData()
    form.append('title', formState.title);
    form.append('date', formState.date.toString());

    // Convert images to required format
    form.append('images', JSON.stringify(formState.images));
		images.forEach((image) => {
			form.append('newImages', image);
		});

    form.append('description', formState.description)

    console.log("Acquired data:", form)

    const res = await fetch(`https://acro-events.onrender.com/api/events/${formState._id}`, {
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg0NTIyODkyLCJleHAiOjE2ODUxMjc2OTJ9.UE0_W3HBwkaW4vxv339HeJxIDM2jUufhoCSP5cvriaE',
      },
      method: 'PUT',
      body: form,
    })
    console.log("Sent and recieved this:", res)

    const data = await res.json();
    if (data.success) {
      setFormState(data.event);
      setCopyState(data.event);
      setImages([]);
      setPreviews([]);
      setIsEditing(!isEditing);
    }
  };

  const onCancel = () => {
    setFormState(copyState);
    setImages([]);
    setPreviews([]);
    setIsEditing(!isEditing);
  };

  const onDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(`https://acro-events.onrender.com/api/events/${formState._id}`, {
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg0NTIyODkyLCJleHAiOjE2ODUxMjc2OTJ9.UE0_W3HBwkaW4vxv339HeJxIDM2jUufhoCSP5cvriaE',
      },
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) {
      removePost(formState._id);
      setIsEditing(!isEditing);
    }
  };

  const editingTemplate = (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input 
          type="date" 
          className="date-picker" 
          onChange={(e) => handleChange(e, 'date')}
          value={formatDate(formState.date.toString())}
        />

        {/*{ console.log("Initial date value:", date) }*/}

        <input 
          type="text" 
          value={formState.title} 
          onChange={(e) => handleChange(e, 'title')}
          className="title-area"/>
        {
          formState.images.length !== 0 && 
          <Carousel
            data={formState.images}
            removeImage={removeImage}
            isEditing={isEditing}
          /> 
        }

        <StyledImageUploader
          id={formState._id}
          nameProp='images'
          valueProp={formState.images}
          onChangeProp={handleImages}
        >Upload images</StyledImageUploader>
        <ImageSlider data={previews}/>

        <label htmlFor="description">
          Want to describe the event?
        </label>
        <textarea name="description" 
          id="description" 
          cols={30} rows={10}
          onChange={(e) => handleChange(e, 'description')}
        >{formState.description}</textarea>

        <button>
          Save
        </button>
        <button onClick={onCancel}>
          Cancel
        </button>
        <button onClick={onDelete}>
          Delete post
        </button>
      </form>
    </React.Fragment>
  );


  const editTemplate = (
    <React.Fragment>  
      <div className="date">
        {(new Date(formState.date)).toDateString()}
      </div>
      <h2 className="title">
        {formState.title}
      </h2>
      { 
        formState.images.length !== 0 && 
        <Carousel data={formState.images} isEditing={isEditing}/> 
      }
      <p>{formState.description}</p>
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </React.Fragment>
  );

  /* tslint:disable:no-unused-variable */
  const _viewTemplate = (
    <React.Fragment>
      
      <div className="date">{(new Date(formState.date)).toDateString()}</div>
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