import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import CreateCustomer from "./pages/Customer/CreateCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import ViewOneCustomer from "./pages/Customer/ViewOneCustomer";
import AllCustomer from "./pages/Customer/AllCustomer";

const App = () => {
  return (
    <Routes>
    <Route path='/home' element={<Home/>}/>
    
    <Route path='/customers/create' element={<CreateCustomer/>}/>
    <Route path='/customers/edit/:id' element={<EditCustomer/>}/>
    <Route path='/customers/viewone' element={<ViewOneCustomer/>}/>
    <Route path='/customers/all' element={<AllCustomer/>}/>
    <Route path='/about' element={<About/>}/>
    </Routes>
  )
}

export default App;