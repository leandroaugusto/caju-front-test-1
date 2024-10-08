import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

import routes from "./routes";

const HistoryPage = () => <div>History</div>;

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={DashboardPage} />
          <Route exact path={routes.newUser} component={NewUserPage} />
          <Route exact path={routes.history} component={HistoryPage} />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
