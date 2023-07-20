import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WareHouseData } from "../Data/Data";
import List from "./List";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "./Navbar";

const WarehouseList = () => {
  const searchText = useRef("");
  const selectRef = useRef(null);
  const [filteredWarehouses, setFilteredWarehouses] = useState(WareHouseData);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempSearchTerm = searchText.current.value.trim();

    const formattedSearchTerm =
      selectRef.current.value === "cluster"
        ? tempSearchTerm.toLowerCase()
        : tempSearchTerm.charAt(0).toUpperCase() +
          tempSearchTerm.slice(1).toLowerCase();
    const selectedOption = selectRef.current.value; // Get the value of the selected option
    // Check if the selected option is "space" and the input value is a valid number
    let filteredResults = WareHouseData;
    if (selectedOption === "city") {
      // Filter by city
      filteredResults = filteredResults.filter((warehouse) =>
        warehouse.city.toLowerCase().includes(formattedSearchTerm.toLowerCase())
      );
      toast.success("Your city data found successfully...", {
        position: "top-left",
        theme: "colored",
      });
    }else if (selectedOption === "cluster") {
      // Filter by cluster
      filteredResults = filteredResults.filter((warehouse) =>
        warehouse.cluster.toLowerCase().includes(formattedSearchTerm)
      );
      toast.success("Your cluster data found successfully...", {
        position: "top-left",
        theme: "colored",
      });
    }else if (selectedOption === "space") {
      // Filter by space available limit (e.g., greater than or equal to the input number)
      const spaceLimit = parseInt(tempSearchTerm);
      if (isNaN(spaceLimit)) {
        setError("Please enter a valid number for space.");
        toast.warn("Please enter a valid number for space....", {
          position: "top-left",
          theme: "colored",
        });
        return;
      } else {
        setError(""); // Clear any previous error
        filteredResults = filteredResults.filter(
          (warehouse) => warehouse.space_available >= spaceLimit
        );
        toast.success("Your space data found successfully...", {
          position: "top-left",
          theme: "colored",
        });
      }
    }else {
      // Default search by name (if no option is selected)
      filteredResults = filteredResults.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(formattedSearchTerm.toLowerCase())
      );
      toast.success("Your Name data found successfully...", {
        position: "top-left",
        theme: "colored",
      });
    }
   
   

    setFilteredWarehouses(filteredResults);

    // Clear the input box after submission
    searchText.current.value = "";
  };


  return (
    <>
    <div className="warehouseCointainer">
      
      <div className="WarehouseList">
      <Navbar/>
        <form className="search" onSubmit={handleSubmit}>
          <div className="searchBox">
            <input type="text" placeholder="Enter item...." ref={searchText} />
            <select name="Select" id="select" ref={selectRef}>
              <option value="">Select Type</option>
              <option value="city">City</option>
              <option value="cluster">Cluster</option>
              <option value="space">Space</option>
            </select>
            <button type="submit">
              <FaSearch size={32} className="searchIcon" />
            </button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="listItems">
        {filteredWarehouses.length > 0 ? (
          filteredWarehouses.map((w, i) => <List data={w} key={i} />)
        ) : (
          <div>No warehouses found.</div>
        )}
        </div>
      </div>
      </div>
    </>
  );
};

export default WarehouseList;