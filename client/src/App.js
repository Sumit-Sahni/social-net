import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import Home from './screen/Home';
import Welcome from './screen/welcome';
import MyProfile from './screen/myProfile';
import UpdateProfile from './screen/UpdateProfile';
import LandingPage from './screen/LandingPage';
import ViewProfile from './screen/ViewProfile';





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
      <Route path="/update/:id" exact element={<UpdateProfile/>} />
      <Route path="/viewprofile/:id" exact element={<ViewProfile/>} />
     </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;
