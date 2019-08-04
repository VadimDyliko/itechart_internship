import React from 'react';
import classnames from 'classnames';

const MenuTogleBtn = ({isOpenHandler, isOpen}) => {

  let btnLine = classnames({
    "btn__line hide": isOpen,
    "btn__line": !isOpen
  })
  let btnLineFirst = classnames({
    "btn__line btn__line_first": isOpen,
    "btn__line": !isOpen
  })
  let btnLineSecond = classnames({
    "btn__line btn__line_second": isOpen,
    "btn__line": !isOpen
  })

  const clickHandler = () => {
    isOpenHandler()
  }

  return (
    <button className="nav-bar__btn" onClick={clickHandler}>
      <div className={btnLineFirst}></div>
      <div className={btnLineSecond}></div>
      <div className={btnLine}></div>
    </button>
  )
}

export default MenuTogleBtn
