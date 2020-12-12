import React from "react";

export const Alert = ({type,text}) => {
  console.log("Burdaki type",Object.values({type}));
  
  return <div className={`alert alert-${type}`}>{text}</div>;
};
export default Alert;
