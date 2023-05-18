interface InputPropInterface {
  nameProp: string; 
  valueProp: any;
  onChangeProp: any;
  placeholderProp?: string;
  children?: any;
}

export default function StyledHeadingInput(props : InputPropInterface) {
  return <input 
    type="text" 
    name={props.nameProp}
    value={props.valueProp}
    onChange={props.onChangeProp}
    placeholder={props.placeholderProp}
    className="w-full border-4 border-solid border-gray-800 rounded-lg p-1 mb-3"
  />
}