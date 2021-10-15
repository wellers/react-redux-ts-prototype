import * as React from "react";
import { connect } from "react-redux";
import PageContentBox from "../components/pageContentBox";

interface Props { }

class HomeContainer extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {		
		return (
			<PageContentBox hideTrailingMargin={true}>
				This is a Web application project demonstrating the use of .NET Core, TypeScript, Redux, React, LESS styling, Webpack bundling and NJsonSchema for generating shared types.
			</PageContentBox>
		);
	}	
}

export default connect()(HomeContainer);