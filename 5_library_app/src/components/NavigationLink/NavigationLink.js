import React from "react";
import { Link } from "react-router-dom";
import './NavigationLink.css'

class NavigationLink extends React.PureComponent {
  render() {
    return (<Link to={this.props.toPath} className="navigation-link">
      <img className="navigation-link__icon" src={this.props.icon} alt="icon"/>
      <p className="navigation-link__link-text">{this.props.linkText}</p>
    </Link>);
  }
}

export default NavigationLink;
