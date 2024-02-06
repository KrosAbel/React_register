import Register from './components/Register';
import Login from './components/Login'
import Home from './components/Home'
import Admin from './components/Admin';
import Editor from './components/Editor'
import Linkpage from './components/LinkPage';
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import './App.css';

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/**Public Routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<Linkpage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/**Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path='lounge' element={<Lounge />} />
          </Route>
        </Route>

        {/**Catch All */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
