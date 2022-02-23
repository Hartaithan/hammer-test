import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route
            path={`${APP_PREFIX_PATH}/dashboard`}
            component={lazy(() => import(`./dashboard`))}
          />
          <Route
            exact
            path={`${APP_PREFIX_PATH}/clients/list`}
            component={lazy(() => import(`./user-list`))}
          />
          <Route
            path={`${APP_PREFIX_PATH}/clients/list/edit/:id`}
            component={lazy(() => import(`./user-edit`))}
          />
          <Route
            path={`${APP_PREFIX_PATH}/planner`}
            component={lazy(() => import(`./planner`))}
          />
          <Redirect
            from={`${APP_PREFIX_PATH}`}
            to={`${APP_PREFIX_PATH}/dashboard`}
          />
        </Switch>
      </DndProvider>
    </Suspense>
  );
};

export default React.memo(AppViews);
