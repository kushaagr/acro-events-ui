import React from 'react'

export default function StyledDescription({nameProp, valueProp, onChangeProp, children}) {

  return <React.Fragment>
    <textarea name={nameProp} id={nameProp} cols="30" rows="10"
      value={valueProp}
      onChange={onChangeProp}
      placeholder={children}
      className="resize-y w-full"
    ></textarea>
  </React.Fragment>
}