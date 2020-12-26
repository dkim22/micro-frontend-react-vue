// import { MarketingReactComponent } from 'marketing/MarketingApp';
// <MarketingReactComponent />    이런 식으로 직접 리액트 컴포넌트를 마운트를 시킬 수는 있지만 이런식으로 시키는 것은 서로가 리액트가 아니라
// 다른 프레임워크를 사용하게 되면 독립적이지 못 하기 때문에 안 좋다. 마이크로 프론트엔드에서는 이런 것을 피해야 한다.

import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
