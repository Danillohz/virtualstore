import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactRoutes from "./components/Routes/AppRoutes"
import BackgroundColor from './components/Routes/BackGroundBody';


function App() {
  return (
    <div className="app">
      <BackgroundColor></BackgroundColor>
      <ReactRoutes></ReactRoutes>
    </div>
      
  );
}

export default App;
