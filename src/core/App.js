import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Popup from "../components/Popup";
import Dashboard from "../components/Dashboard";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CONFIG_GET" });
  }, [dispatch]);

  return (
    <div>
      <CssBaseline />

      <Switch>
        <Route path="/" exact component={Popup} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
