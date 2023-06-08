import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login"
import CeoView from "../Pages/CeoView/CeoView"
import ClientView from "../Pages/ClientView/ClientView";
import Payment from "../Pages/Payment/Payment"




function AppRoutes() {
    return (
      
            <>
                <Routes>
                        <Route path="/" background="blue" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/ceoview" element={<CeoView />} />
                        <Route path="/clientview" element={<ClientView />} />
                        <Route path="/payment" element={<Payment />} />
                        
                </Routes>
            </> 
          
    )
}

export default AppRoutes;