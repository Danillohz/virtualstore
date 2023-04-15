import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./Home";
import Login from "./Login"
import CeoView from "./CeoView"
import ClientView from "./ClientView";




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