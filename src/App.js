import React from "react";
import { Route, Switch } from "react-router-dom";
import AnaSayfa from "./Components/Anasayfa";
import SiparisFormu from "./Components/SiparişFormu";
import SiparisOnay from "./Components/SiparisOnay";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <AnaSayfa />
      </Route>
      <Route path="/order" exact>
        <SiparisFormu />
      </Route>
      <Route path="/succes">
        <SiparisOnay />
      </Route>
    </Switch>
  );
};
export default App;
