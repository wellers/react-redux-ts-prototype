import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsContainer from "./containers/ContactsContainer";

export const RouterUrls = {
  ContactsUrl: '/Contacts'
}

export default function AppRouter() {
  return (
    <>
      <Router basename="/App/DMS">
        <Switch>
          <Route exact={true} path={RouterUrls.ContactsUrl} component={Contacts} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

function Contacts() {
  return (
    <ContactsContainer />
  );
}

function PageNotFound() {
  return (
    <span>Page Not Found</span>
  );
}
