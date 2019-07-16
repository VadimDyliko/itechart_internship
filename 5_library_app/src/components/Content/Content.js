import React from "react";
import {connect} from 'react-redux'
import "./Content.css";
import BooksList from "./BooksList/BooksList";
import BookDetail from "./BookDetail/BookDetail";
import ContentSpiner from "./ContentSpiner";

class Content extends React.Component {
  state = {
    booksArr: [],
    searchResultArr: [],
    showSpiner: false,
    isBookDetailShow: false,
    bookDetailId: '',
    books:[]
  };

  componentDidMount() {
    this.setState({showSpiner: true})
    fetch("/books").then(res => res.json()).then(data => {
      this.setState({booksArr: data, showSpiner: false})
    }).catch(err => console.log(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false
    } else {
      let searchResultArr = []
      if (nextProps.search !== '') {
        let regExp = new RegExp(String(nextProps.search));
        searchResultArr = this.state.booksArr.filter(book => {
          let isMatch = false
          for (let prop in book) {
            if (prop !== 'year' && prop !== 'bookAthour' && prop !== 'tittle') continue
            if ((typeof book[prop]) === 'string' || (typeof book[prop]) === 'number') {
              let propValue = String(book[prop])
              if (propValue.search(regExp) >= 0) {
                isMatch = true
                continue;
              }
            }
          }
          if (isMatch) {
            return true
          } else {
            return false
          }
        })
        if (searchResultArr.length!==0) {
          nextState.books = searchResultArr
        }
      } else {
        nextState.books= nextState.booksArr
      }
      return true
    }
  }

  bookDetailCloseHandler = e =>{
    this.setState({isBookDetailShow:false, bookDetailProps: {}})
  }

  bookDetailHandler = (e, bookId) => {
    this.setState({isBookDetailShow:true, bookDetailId: bookId})
  }

  render() {
    let bookDetail = this.state.isBookDetailShow?<BookDetail bookDetailId={this.state.bookDetailId} bookDetailCloseHandler={this.bookDetailCloseHandler}/>:(<></>)
    let spiner = this.state.showSpiner?(<ContentSpiner/>):(<></>);
    return (
      <div className="content">
        {spiner}
          <div className="content__books">
            {bookDetail}
            <BooksList booksArr={this.state.books} bookDetailHandler={this.bookDetailHandler}/>
          </div>
      </div>);
  }
}

const putStatetoProps = state => {
  return {search: state.search};
};

export default connect(putStatetoProps)(Content);
