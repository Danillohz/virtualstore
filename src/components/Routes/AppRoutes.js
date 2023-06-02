import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login"
import CeoView from "../Pages/CeoView/CeoView"
import ClientView from "../Pages/ClientView/ClientView";




function AppRoutes() {
    return (
      
            <>
                <Routes>
                        <Route path="/" background="blue" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/ceoview" element={<CeoView />} />
                        <Route path="/clientview" element={<ClientView />} />
                        
                </Routes>
            </> 
          
    )
}

export default AppRoutes;