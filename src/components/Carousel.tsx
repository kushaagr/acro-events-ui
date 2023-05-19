import { useState } from 'react';
import './Carousel.css';

interface PropInterface {
  data: { _id: string, url: string }[]
  removeImage?: (_id: string) => void,
  isEditing: boolean,
}

export default function Carousel(props: PropInterface) {
  const [index, setIndex] = useState(0);
  const images = props.data;

  return (
    <>
      <div className="slideshow-container">
        { 
          images.length !== 0 && 
          <>
            { props.isEditing &&
              <button
                className="image-delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  props.removeImage?.(props.data[index]._id);
                }}
              >
                <span className="visually-hidden">Delete image</span>
              </button>
            }
            {/*<img src={images[index]} alt="" className="fullframe"/>*/}
            <img src={images[index].url} alt="" className="fullframe"/>
          </>
        }
        {
          images.length > 1 && 
          <>
            <button 
              onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="arrowbutton left">❮</button>
            <button 
              onClick={() => setIndex((prev) => (prev + 1)% images.length)}
              className="arrowbutton right">❯</button>
          </>
        }
        <span className="indicator-box">
          {
            images.map((_, ind) => {
              return <span key={ind} className={"indicator " + (ind === index ? "current" : "")}>&#x2218;</span>
            })
          }
        </span> 
      </div>
    </>
  );
}