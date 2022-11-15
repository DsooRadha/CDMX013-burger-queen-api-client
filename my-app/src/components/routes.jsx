import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import login from './login';
import Administrador from './admin'

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/admin" element={<Administrador />} />
                    <Route path="/" element={<login />} />
                </Routes>
            </Router>

        </div>
    );
}

export default App;