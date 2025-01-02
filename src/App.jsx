import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Component/Navbar";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import FindJob from "./Component/Findjob"; // Find Job Page Component
import Savedjobsadd from "./Component/Savedjobsadd";
import NavbarBar from "./Component/NavbarBar";
import Footer from "./Component/Footer";
import SearchNavBar from "./Component/SearchNavBar";

const App = () => {
  return (
    <Router>
      
      <Routes>
        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes (with Navbar) */}
        <Route
          path="/Findjob"
          element={
            <div>
            <div className="page-container">
              <NavBar />
              <NavbarBar/>
              <SearchNavBar />
   
              </div>
              <div className="content"><FindJob /></div>
              <Footer/>
              </div> 
            
         
          }
        />
       <Route
  path="/saved-jobs"
  element={
    <div>
      <div className="page-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <NavbarBar />
        <SearchNavBar />
        <div className="content" style={{ flex: '1', overflowY: 'auto', paddingBottom: '40px' }}>
          <div className="saved-jobs">
            <Savedjobsadd />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  }
/>

  
  

        {/* You can add more protected routes similarly */}
      </Routes>
    </Router>
  );
};

export default App;
