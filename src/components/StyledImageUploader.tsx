import React from 'react'

export default function StyledImageUplaoder({nameProp, valueProp, onChangeProp, children}) {

  return <React.Fragment>
    <label 
      htmlFor={nameProp} className="mb-3 block transition-colors hover:bg-gray-200 outline-blue-300 active:outline-2 outline-3 outline-dashed rounded-sm p-2">{children}</label>
    <input 
      id={nameProp}
      name={nameProp}
      // value={valueProp}
      onChange={onChangeProp}
      type="file"
      multiple 
      accept="image/*"
      className="visually-hidden mb-3"
    />  
  </React.Fragment>
}