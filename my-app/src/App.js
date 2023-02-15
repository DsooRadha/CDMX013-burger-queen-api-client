import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import { Welcome } from './noauth/Login'
import { AdminEmployees } from './auth/adminPage/Admin';
import { AdminInicio } from './auth/adminPage/Admin';
import { AdminProducts } from './auth/adminPage/Admin';
import { EditProducts } from './auth/adminPage/EditProducts';
import { Waiter } from './auth/waiterPage/Waiter';
import { Kitchen } from './auth/KitchenPage/kitchen';
import { NotFound } from './noauth/404';

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <div>
        {!user ?
            <Routes>
              <Route path='/' element={<Welcome setUser={setUser} />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            :
            <Routes>
              <Route path='admin' element={<AdminInicio setUser={setUser} />}>
                <Route index element={<AdminEmployees />}></Route>
                <Route path='products' element={<AdminProducts />}></Route>
                <Route path='employees' element={<AdminEmployees />}></Route>
              </Route>
              <Route path='admin/products/:id' element={<EditProducts />} />
              <Route path='waiter' element={<Waiter setUser={setUser} />} />
              <Route path='kitchen' element={<Kitchen setUser={setUser} />} />
            </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
