import React from "react";
import { Route } from 'react-router-dom';
import './Content.css';
import HomeContainer from '../../containers/HomeContainer';
import BookDetailContainer from '../../containers/BookDetailContainer';
import SearchContainer from '../../containers/SearchContainer';

class Content extends React.PureComponent {

  render() {
    return (<div className="content">
      <Route path="/" exact component={HomeContainer}/>
      <Route path="/home" component={HomeContainer}/>
      <Route path="/search" component={SearchContainer}/>
      <Route path="/book/:bookId/" exact component={BookDetailContainer}/>
      {this.props.children}
    </div>);
  }
}

export default Content;
