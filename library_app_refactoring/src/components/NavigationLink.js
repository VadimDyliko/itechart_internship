import React from "react";
import { Link } from "react-router-dom";
import './NavigationLink.css'

class NavigationLink extends React.PureComponent {
  render() {
    return (
      <Link to={this.props.toPath} className="navigation-link">
        <img src={this.props.icon} alt="icon" style={{width:'30px', height:'30px', borderRadius: '50%'}}/>
        <p className="navigation-link__link-text" >{this.props.linkText}</p>
      </Link>
    );
  }
}

export default NavigationLink;
