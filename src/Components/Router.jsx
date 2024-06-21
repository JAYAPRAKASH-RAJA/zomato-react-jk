import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Details from "./Details";
import Filter from "./Filter";
import Header from './Header'

function Router() {
  return (
    <>

      <BrowserRouter>



        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/details" element={<Details />} />
          

        </Routes>
        <Header />



      </BrowserRouter></>

  );
}

export default Router;
