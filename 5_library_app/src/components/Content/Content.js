import React from "react";
import {Route} from 'react-router-dom';
import './Content.css';
import HomeContainer from '../../containers/HomeContainer';
import BookDetailContainer from '../../containers/BookDetailContainer';
import YourLibraryContainer from '../../containers/YourLibraryContainer';

class Content extends React.PureComponent {

  render() {
    return (<div className="content">
      <Route path="/" exact component={HomeContainer}/>
      <Route path="/home" component={HomeContainer}/>
      <Route path="/yourlibrary" component={YourLibraryContainer}/>
      <Route path="/book/:bookId/" component={BookDetailContainer}/> 
      {this.props.children}
    </div>);
  }
}

export default Content;
