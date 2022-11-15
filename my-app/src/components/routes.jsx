import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import login from './components/login'
import admin from ''

function App() {

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/signup" element={<admin />} />
            <Route path="/" element={<login />} />
          </Routes>
        </Router>
  
      </div>
    );
  }
  
  export default App;