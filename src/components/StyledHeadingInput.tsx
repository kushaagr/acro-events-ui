import React from 'react';

export default function StyledHeadingInput({nameProp, valueProp, onChangeProp, placeholderProp}) {
  return <input 
    type="text" 
    name={nameProp}
    value={valueProp}
    onChange={onChangeProp}
    placeholder={placeholderProp}
    className="w-full border-4 border-solid border-gray-800 rounded-lg p-1 mb-3"
  />
}