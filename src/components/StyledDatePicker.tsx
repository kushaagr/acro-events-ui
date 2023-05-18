import React from 'react'

export default function StyledDatePicker({nameProp, valueProp, onChangeProp, children}) {

  return <React.Fragment>
    <label 
      htmlFor={nameProp}
      className="block underline mb-1 "
    // >When did event start?</label>    
    >{children}</label>    
    <input 
      // id={`${nameProp}-${count}`}
      id={nameProp}
      name={nameProp}
      value={valueProp}
      onChange={onChangeProp}
      type="date"
      className="block mb-3 border-4 border-solid border-gray-800 px-2 rounded-lg" 
    />
  </React.Fragment>
}