interface InputPropInterface {
  nameProp: string; 
  valueProp: any;
  onChangeProp: any;
  placeholderProp?: string;
  children?: any;
}

type EventPost = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  images: { _id: string; url: string }[];
};