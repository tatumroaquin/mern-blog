import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI/Layout';
import { Post } from './pages/Post';

function App() {
  const markdown = `
  Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.

  | Item | Price | In stock |
  | :--- | :---: | --- |
  | Test | Test | Test |

  * Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
  * Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
  * Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
  * ~Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.~

  1. First item
  2. First item
  3. First item
  4. First item

  ~~~javascript
  function hello() {
    console.log('world 0123');
  }
  ~~~
`;
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route index element={<Post children={markdown} />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
