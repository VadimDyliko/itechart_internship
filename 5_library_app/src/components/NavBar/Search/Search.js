import React from 'react';
import {connect} from 'react-redux'
import {setSearch} from '../../../store/actions'
import './Search.css'

class Search extends React.PureComponent {
state={
  searchStr: ''
}

componentDidUpdate(prevProps, prevState) {
  this.props.dispatch(setSearch(this.state.searchStr))
}

searchStrHandler =(e)=>{
  this.setState({searchStr: e.target.value})
}

  render () {
    // <div className="input-group-append">
    //   <button className="btn btn-outline-primary" type="button">Search</button>
    // </div>
  return(
    <div className="search">
      <input type="text" className="form-control" placeholder="Search ..." onChange={this.searchStrHandler}></input>
    </div>
  )
  }
}

export default connect()(Search);
