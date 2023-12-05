import React from "react";
import { Route, Switch } from "react-router-dom";
import AnaSayfa from "./Components/Anasayfa";
import SiparisFormu from "./Components/SiparişFormu";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <AnaSayfa />
      </Route>
      <Route path="/order">
        <SiparisFormu />
      </Route>
    </Switch>
  );
};
export default App;
