// import { MarketingReactComponent } from 'marketing/MarketingApp';
// <MarketingReactComponent />    이런 식으로 직접 리액트 컴포넌트를 마운트를 시킬 수는 있지만 이런식으로 시키는 것은 서로가 리액트가 아니라
// 다른 프레임워크를 사용하게 되면 독립적이지 못 하기 때문에 안 좋다. 마이크로 프론트엔드에서는 이런 것을 피해야 한다.

import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
