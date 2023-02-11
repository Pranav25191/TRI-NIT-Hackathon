import './App.css';
import NavBar from './components/NavBar';
import "./input.css";
import {Routes,Route} from "react-router-dom"
import Footer from './components/Footer';
import Home from './components/Home';
import KeySelection from './components/keySelection/KeySelection';
function App() {
  return (
    <div className="App flex-col gap-14 h-full">
      <NavBar/>
      <div className='min-h-[100vh]'>
        <Routes>
        <Route path='/' element={<KeySelection/>}></Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}
// <Footer/>
export default App;
