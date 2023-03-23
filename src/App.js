import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactRoutes from "./components/AppRoutes"
import BackgroundColor from './components/BackGroundBody';


function App() {
  return (
    <div>
      <BackgroundColor></BackgroundColor>
      <ReactRoutes></ReactRoutes>
    </div>
      
  );
}

export default App;
