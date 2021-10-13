import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import ContactsContainer from "./containers/ContactsContainer";

export const RouterUrls = {
	HomeUrl: '/',
	ContactsUrl: '/Contacts'
}

export default function AppRouter() {
	return (
		<>
			<Router basename="/App">
				<Switch>
					<Route exact={true} path={RouterUrls.HomeUrl} component={Home} />
					<Route exact={true} path={RouterUrls.ContactsUrl} component={Contacts} />
					<Route component={PageNotFound} />
				</Switch>
			</Router>
		</>
	);
}

function Home() {
	return (
		<HomeContainer />
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
