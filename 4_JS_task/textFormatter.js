let testStr = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function textFormat(str, maxCols, maxRows, typeOfWarp) {
  var formatedStr, formatedArr,regExp, strSymbols
  strSymbols = Math.ceil(str.length/maxRows)
  console.log(strSymbols);
  typeOfWarp = 'suggestions'
  switch (typeOfWarp) {
    case 'word':
    regExp = new RegExp('[^]{0,'+(strSymbols-1)+'}[\\s,\\n]', 'gi')
    break
    case 'symbol':
    regExp = new RegExp('[^]{0,'+strSymbols+'}', 'gi')
    break
    case 'suggestions':
    regExp = new RegExp('[A-Z][\\w\\d\\s-,]+[\\.\\!\\?]','g')
    break
    default:
    regExp = str
  }
  formatedArr = str.match(regExp)
  console.log(formatedArr);
}


textFormat(testStr,25 , 5, 'word')


















// var formatedStr, formatedArr
// switch (typeOfWarp) {
//   case 'word':
//     formatedStr = str.split(' ').join('\n')
//   break
//   case 'symbol':
//     formatedStr = str.split('').join('\n')
//   break
//   case 'suggestions':
//     formatedStr = str.split('. ').join('.\n')
//   break
//   default:
//     formatedStr = str
// }
// if (maxCols){
//   formatedArr = formatedStr.match(new RegExp('[^]{0,'+maxCols+'}[\\s,\\n]', 'gi'))
//   formatedStr = formatedArr.join('\n')
// }
//
// if (maxRows){
//   var maxRowsFormated = formatedStr.split('').filter(function(item){return item!=='\n'}).join('')
//   console.log(Math.ceil(maxRowsFormated.length/maxRows));
//   formatedArr = maxRowsFormated.match(new RegExp('[^]{0,'+(Math.ceil(maxRowsFormated.length/(maxRows))+maxRows)+'}[\\s]', 'gi'))
//   console.log(formatedArr);
// }
