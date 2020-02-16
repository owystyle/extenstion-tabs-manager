import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GlobalProvider from "./providers/GlobalProvider";
import { default as Layout } from "./layout/Main";
import Tabs from "./views/Tabs";
import Bookmark from "./views/Bookmark";

function Dashboard() {
  // Print state for debugging
  const state = useSelector(state => state);
  console.log("STATE", state);

  // Get all data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "TABS_GET" });
    dispatch({ type: "BOOKMARKS_GET" });
  }, [dispatch]);

  return (
    <GlobalProvider>
      <Layout>
        <Switch>
          <Route path="/dashboard" component={Tabs} exact />
          <Route path="/dashboard/bookmark/:id" component={Bookmark} />
        </Switch>
      </Layout>
    </GlobalProvider>
  );
}

export default Dashboard;
