import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI/Layout';
import { Home } from './pages/Home';
import { ViewPost } from './pages/post/ViewPost';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NewPost } from './pages/post/NewPost';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [markdown, setMarkdown] = useLocalStorage('markdown');

  return (
    <>
        <Router>
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path='post'>
                <Route path='new' element={<NewPost />} />
                <Route path='view' element={<ViewPost children={markdown}/>} />
                <Route path='edit' element={<Home />} />
              </Route>
              <Route path='auth'>
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
              </Route>
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
    </>
  );
}

export default App;
