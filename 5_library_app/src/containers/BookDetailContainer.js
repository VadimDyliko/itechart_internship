import React from "react";

class BookDetailContainer extends React.PureComponent {

  render() {
    return (
      <div>
      {this.props.match.params.bookId}
      </div>
    );
  }
}

export default BookDetailContainer;
