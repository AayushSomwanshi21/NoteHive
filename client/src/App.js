import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar_Head from './components/Navbar_Head';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert_Msg from './components/Alert_Msg';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar_Head />
          <Alert_Msg message="This is an alert" />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
