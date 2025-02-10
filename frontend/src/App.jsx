import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import CreateCustomer from "./pages/Customer/CreateCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import ViewOneCustomer from "./pages/Customer/ViewOneCustomer";
import AllCustomer from "./pages/Customer/AllCustomer";

import CreateEmployee from "./pages/Employee/CreateEmployee";
import ViewOneEmployee from "./pages/Employee/ViewOneEmployee";
import AllEmployee from "./pages/Employee/AllEmployee";
import EditEmployee from "./pages/Employee/EditEmployee";

import CreateOrder from "./pages/Order/CreateOrder";
import ViewOneOrder from "./pages/Order/ViewOneOrder";
import AllOrder from "./pages/Order/AllOrder";
import EditOrder from "./pages/Order/EditOrder";

import CreateProduct from "./pages/Product/CreateProduct";
import EditProduct from "./pages/Product/EditProduct";
import ViewOneProduct from "./pages/Product/ViewOneProduct";
import AllProduct from "./pages/Product/AllProduct";


const App = () => {
  return (
    <Routes>
    <Route path='/home' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    
    <Route path='/customer/create' element={<CreateCustomer/>}/>
    <Route path='/customer/edit/:id' element={<EditCustomer/>}/>
    <Route path='/customer/viewone' element={<ViewOneCustomer/>}/>
    <Route path='/customer/all' element={<AllCustomer/>}/>

    <Route path='/employee/create' element={<CreateEmployee/>}/>
    <Route path='/employee/edit/:id' element={<EditEmployee/>}/>
    <Route path='/employee/viewone' element={<ViewOneEmployee/>}/>
    <Route path='/employee/all' element={<AllEmployee/>}/>

    <Route path='/order/create' element={<CreateOrder/>}/>
    <Route path='/order/edit/:id' element={<EditOrder/>}/>
    <Route path='/order/viewone' element={<ViewOneOrder/>}/>
    <Route path='/order/all' element={<AllOrder/>}/>

    <Route path='/product/create' element={<CreateProduct/>}/>
    <Route path='/product/edit/:id' element={<EditProduct/>}/>
    <Route path='/product/viewone' element={<ViewOneProduct/>}/>
    <Route path='/product/all' element={<AllProduct/>}/>
  
    
    </Routes>
  )
}

export default App;