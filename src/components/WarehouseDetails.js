import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WareHouseData } from "../Data/Data";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const WarehouseDetails = () => {
  const { id } = useParams();

  // State to store the selected warehouse data
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    // Find the warehouse data with the matching id
    const selectedWarehouse = WareHouseData.find(
      (warehouse) => warehouse.id === Number(id)
    );
    setData(selectedWarehouse);
    setEditedData(selectedWarehouse); // Initialize the editedData state with the selected data
  }, [id]);

  // If the data is not found (e.g., invalid id), you can handle the case accordingly
  if (!data) {
    return <div>Warehouse not found</div>;
  }

  // Determine the color based on is_live property
  const dotColor = data.is_live ? "rgb(31, 235, 31)" : "rgb(235, 62, 31)";

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the data with the edited data
    setData(editedData);
    setEdit(false); // Disable edit mode after saving changes
    // You can also save the editedData to your backend or update the original dataset here
    toast.success("Warehouse Details updated Successfully...", {
      position: "top-left",
      theme: "colored",
    });
  };
  const handleLiveToggle = () => {
    setEditedData({ ...editedData, is_live: !editedData.is_live });
    setData({ ...data, is_live: !data.is_live }); // Update the data state as well
    if (!data.is_live) {
      toast.success("Warehouse Details live now...", {
        position: "top-left",
        theme: "colored",
      });
    } else {
      toast.warn("Warehouse Details inactive now...", {
        position: "top-left",
        theme: "colored",
      });
    }

  };

  return (
    <div className="warehouseCointainer">
      <div className="WarehouseList">
        <Navbar />
        <div className="container">
          <h1>
            Name:{" "}
            {edit ? (
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                className="input"
              />
            ) : (
              <>
                {data.name}{" "}
                <GoDotFill
                  id="live"
                  style={{ color: dotColor }}
                  onClick={handleLiveToggle}
                />
              </>
            )}{" "}
            {edit ? (
              <FaSave className="edit" onClick={handleSubmit} />
            ) : (
              <TbEdit className="edit" onClick={() => setEdit(true)} />
            )}
          </h1>
          <p>Code: {data.code}</p>
          <h3>
            City:{" "}
            {edit ? (
              <input
                type="text"
                name="city"
                value={editedData.city}
                onChange={handleInputChange}
                className="input"
              />
            ) : (
              <>{data.city}</>
            )}
          </h3>
          <h3>
            Space available:{" "}
            {edit ? (
              <input
                type="text"
                name="space_available"
                value={editedData.space_available}
                onChange={handleInputChange}
                className="input"
              />
            ) : (
              <>{data.space_available}</>
            )}
          </h3>
          <p>Type: {data.type}</p>
          <p>
            Cluster:{" "}
            {edit ? (
              <input
                type="text"
                name="cluster"
                value={editedData.cluster}
                onChange={handleInputChange}
                className="input"
              />
            ) : (
              <>{data.cluster}</>
            )}
          </p>
          <p>
            Registration:{" "}
            {data.is_registered ? <TiTick id="tick" /> : <RxCross2 id="cross" />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;