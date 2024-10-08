import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import SignUpPage from './components/SignUpPage';
import BiodataCapturePage from './components/BiodataCapturePage';
import ReportingPage from './components/ReportingPage';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component
import UnauthorizedPage from './components/UnauthorizedPage';  // Optional: For unauthorized users
import ClientHomePage from './components/ClientHomePage';
import EditProfilePage from './components/EditProfilePage';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import OrderEdit from './components/OrderEdit';
import CreateMeasurment from './components/CreateMeasurement';
import MeasurementViewPage from './components/MeasurementViewPage';
import MeasurementUpdatePage from './components/MeasurementUpdatePage';



import './styles/global.css';

const App = () => (
  <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/login" element={<div>Biodata submitted successfully!</div>}/> */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />  {/* Optional Unauthorized Route */}
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminPage /></PrivateRoute>} />
          <Route path="/biodata" element={<BiodataCapturePage/>} />
          {/* <Route path="/biodata" element={<PrivateRoute role="client"><BiodataCapturePage /></PrivateRoute>} /> */}
          <Route path="/reporting" element={<ReportingPage />} />
          {/* Success page after submission */}
          <Route path="/success" element={<div>Biodata submitted successfully!</div>} />
          <Route path="/client-home" element={<PrivateRoute role="client"><ClientHomePage /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute role="client"><EditProfilePage /></PrivateRoute>} />
          <Route path='/orders' element={<OrderList/>}/>
          <Route path='/neworders' element={<OrderForm/>}/>
          <Route path="/orders/edit/:orderId" element={<OrderEdit />} /> 
          <Route path="/createmeasurement" element={<CreateMeasurment/>} />
          <Route path="/measurements/update" element={<MeasurementUpdatePage/>} />
          <Route path="/measurements/view" element={<MeasurementViewPage/>} />
          

      </Routes>
  </Router>
);

export default App;
