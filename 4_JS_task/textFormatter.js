function textFormat(str, maxCols, maxRows, typeOfWarp) {
  var formatedStr, formatedArr, regExp, strSymbols
  strSymbols = ''
  if (maxRows!=0) strSymbols = Math.ceil(str.length/maxRows)
  if (maxCols!=0) strSymbols = maxCols-1
  switch (typeOfWarp) {
    case 'word':
    regExp = new RegExp('[^]{0,'+strSymbols+'}[\\s,\\n|.]', 'gi')
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
  formatedArr = str.match(regExp);
  return formatedArr.join('\n');
}



















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
