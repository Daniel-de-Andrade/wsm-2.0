import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Criacao from "./components/Criacao";
import Posts from "./components/Posts";
import Equipe from "./components/Equipe";
import SideMenu from "./components/SideMenu";
import SocialMidia from "./components/SocialMidia";
import Main from "../src/components/cronogramas/Main";
import Cadastrar from "../src/components/cronogramas/Cadastrar";
import Visualizar from "../src/components/cronogramas/Visualizar";
import Listar from "../src/components/cronogramas/Listar";
import Editar from "../src/components/cronogramas/Editar";

function App() {
  const [inactive, setInactive] = useState(false);

  return (
    <div className="App">
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <Switch>
            <Route exact path={"/"} component={Main} />
            <Route exact path={"/cronogramas"} component={Listar} />
            <Route
              exact
              path={"/cronogramas/visualizar/:id"}
              component={Visualizar}
            />
            <Route exact path={"/cronogramas/editar/:id"} component={Editar} />
            <Route exact path={"/cronogramas/criar"} component={Cadastrar} />
            <Route exact path={"/equipe"} component={Equipe} />
            <Route exact path={"/equipe/criacao"} component={Criacao} />
            <Route path={"/equipe/social-midia"} component={SocialMidia} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
