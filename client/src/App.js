import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CharacterCreate from "./components/CharacterCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/character" component={CharacterCreate} />
      </div>
    </BrowserRouter>
  );
}

export default App;
