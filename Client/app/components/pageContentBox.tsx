import * as React from "react";

import "./PageContentBox.less";

export default class PageContentBox extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const hideTrailingMargin = this.props.hideTrailingMargin ? 'hide-trailing-margin' : '';
    const className = `page-content-box ${hideTrailingMargin}`;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

type Props = {
  readonly children: React.ReactNode
  readonly hideTrailingMargin?: boolean;
};