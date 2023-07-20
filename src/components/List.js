import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({data}) => {
  const navigate = useNavigate();

  const handleClick =()=>{
    // console.log(data);
    navigate(`/warehouseDetails/${data.id}`, { state: data });;
    toast.success("Welcome to warehouseDetails...", {
      position: "top-left",
      theme: "colored",
    });
  } 
    
  return (
    <div className='List' onClick={handleClick}>
        <h3>{data.name}</h3>
        <p>City: {data.city}</p>
        <p>Cluster: {data.cluster}</p>
        <p>Space Available: {data.space_available}</p>
      
    </div>
  )
}

export default List