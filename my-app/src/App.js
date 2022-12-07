import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './noauth/Login'
import { AdminEmployees } from './auth/adminPage/Admin';
import { AdminInicio } from './auth/adminPage/Admin';
import { AdminProducts } from './auth/adminPage/Admin';
import { EditProducts } from './auth/adminPage/EditProducts';
import { Waiter } from './auth/waiterPage/Waiter';
import { Kitchen } from './auth/KitchenPage/kitchen';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='admin' element={<AdminInicio />}>
            <Route index element={<AdminEmployees />}></Route>
            <Route path='products' element={<AdminProducts />}></Route>
            <Route path='employees' element={<AdminEmployees />}></Route>
          </Route>
          <Route path='admin/products/:id' element={<EditProducts />} />
          <Route path='waiter' element={<Waiter />} />
          <Route path='kitchen' element={<Kitchen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
