﻿import * as React from "react";
import { connect } from "react-redux";
import PageContentBox from "../components/pageContentBox";
import { Hello } from "../components/Hello";
import { Link } from "react-router-dom";
import { RouterUrls } from "../AppRouter";

interface Props { }

class HomeContainer extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {		
		return (
			<PageContentBox hideTrailingMargin={true}>				
				<Hello compiler={"Typescript"} framework={"React"} />
				<Link to={RouterUrls.ContactsUrl}>Contacts</Link>
			</PageContentBox>
		);
	}	
}

export default connect()(HomeContainer);