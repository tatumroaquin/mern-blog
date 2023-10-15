import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI/Layout';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProtectRoute } from './components/ProtectRoute';
import { ViewUser } from './pages/ViewUser';
import { PersistAuth } from './components/PersistAuth';
import { SignOut } from './pages/SignOut';
import { ViewPost } from './pages/post/ViewPost';
import { AllPosts } from './pages/AllPosts';
import { SearchPost } from './pages/post/SearchPost';
import { NewPost } from './pages/post/NewPost';
import { EditPost } from './pages/post/EditPost';
import { AdminPanel } from './pages/AdminPanel';
import { NotFound } from './pages/NotFound';
import { Unauthorised } from './pages/Unauthorised';
import { VerifyUser } from './pages/VerifyUser';

function App() {
  const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
  };

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistAuth />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />

          <Route path='post'>
            <Route path='all' element={<AllPosts />} />
            <Route path='search' element={<SearchPost />} />
          </Route>

          <Route path='post'>
            <Route path='view/:slug' element={<ViewPost />} />
          </Route>

          <Route path='auth'>
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='logout' element={<SignOut />} />
            <Route
              path='verify/:userId/:verifyToken'
              element={<VerifyUser />}
            />
          </Route>

          <Route
            path='post'
            element={<ProtectRoute allowedRoles={[ROLES.USER]} />}
          >
            <Route path='new' element={<NewPost />} />
            <Route path='edit/:slug' element={<EditPost />} />
          </Route>

          <Route
            path='user'
            element={<ProtectRoute allowedRoles={[ROLES.USER]} />}
          >
            <Route path='view' element={<ViewUser />} />
          </Route>

          <Route
            path='admin'
            element={<ProtectRoute allowedRoles={[ROLES.ADMIN]} />}
          >
            <Route index element={<AdminPanel />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/unauthorised' element={<Unauthorised />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
