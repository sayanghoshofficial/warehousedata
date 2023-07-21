import React, { useContext } from "react";
import { WarehouseDetails, WarehouseList } from "./components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./Authication/SignIn";
import SignUp from "./Authication/SignUp";
import { AuthContext } from "./context/AuthContext";
import NotFound from "./Authication/NotFound";

function App() {
  // current user details through useContext
  const { currentUser } = useContext(AuthContext);
  // protected route for not logged users
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/"} />;
    }
    return children;
  };
  return (
    <>
      <BrowserRouter basename="warehousedata">
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="warehouselist"
            element={
              <ProtectedRoute>
                <WarehouseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="warehouseDetails/:id"
            element={
              <ProtectedRoute>
                <WarehouseDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
