import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import Welcome from './screen/welcome';
import MyProfile from './screen/myProfile';
import LandingPage from './screen/LandingPage';
import ViewProfile from './screen/ViewProfile';
import Admin from './screen/AdminComponent/AdminScreen';
import Event from './screen/Event';
import AddEvent from "./screen/AdminComponent/AddEvents";
import Help from './screen/Help';




function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path="/" exact element={<LandingPage/>}/>
      <Route path="/welcome" exact element={<Welcome/>}/>
      <Route path="/login"   exact element={ <LoginScreen />} />
      <Route path="/register" exact element={<RegisterScreen />} />
      <Route path="welcome/myprofile/:id" exact element={<MyProfile/>} />
      <Route path="/viewprofile/:id" exact element={<ViewProfile/>} />
      <Route path="/Admin" exact element={<Admin/>}/>
      <Route path="/Event" exact element={<Event/>}/>
      <Route path="/Help" exact element={<Help/>}/>
      <Route path="/AddEvent" exact element={<AddEvent/>}/>
     </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;
