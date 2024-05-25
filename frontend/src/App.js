import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login/Login'
import Signup from './Pages/Login/Signup';
import ProtectedRoute from './Pages/ProtectedRoute';
import PageLoading from './Pages/PageLoading';
import Feed from './Pages/Feed/Feed';
import Notifications from './Pages/Notifications/Notifications';
import Explore from './Pages/Explore/Explore';
import Messages from './Pages/Messages/Messages';
import Bookmarks from './Pages/Bookmarks/Bookmarks';
import Lists from './Pages/Lists/Lists';
import Profile from './Pages/Profile/Profile';
import More from './Pages/More/More';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} >
            <Route index element={<Feed />}/>
          </Route>
          <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path='Feed' element={<Feed/>}/>
            <Route path='Explore' element={<Explore/>}/>
            <Route path='Notifications' element={<Notifications/>} />
            <Route path='Messages' element={<Messages/>}/>
            <Route path='Bookmarks' element={<Bookmarks/>}/>
            <Route path='Lists' element={<Lists/>}/>
            <Route path='Profile' element={<Profile/>}/>
            <Route path='More' element={<More/>}/>
          </Route>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/page-loading' element={<PageLoading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
