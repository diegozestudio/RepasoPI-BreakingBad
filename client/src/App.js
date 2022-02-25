import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CharacterCreate from "./components/CharacterCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/character" component={CharacterCreate} />
        <Route exact path="/home/:id" component={Detail} />
      </div>
      
    </BrowserRouter>
  );
}

export default App;
