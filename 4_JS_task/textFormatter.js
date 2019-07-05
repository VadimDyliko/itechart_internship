let testStr = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function textFormat(str, maxCols, maxRows, typeOfWarp) {
  var formatedStr
  switch (typeOfWarp) {
    case 'word':
      formatedStr = str.split(' ').join('\n')
    break
    case 'symbol':
      formatedStr = str.split('').join('\n')
    break
    case 'suggestions':
      formatedStr = str.split('.').join('.\n')
    break
    default:
      formatedStr = str
  }
  console.log(formatedStr.split(' ').reduce(function(preValue, item, i) {
    if (preValue.length%maxCols===0){
      return preValue += item+'\n'
    } else {
      return preValue += item+' '
    }
  }));
  // formatedStr = formatedStr.split(' ').map(function(item, i) {
  //   if (i%maxCols===0 && i!==0){
  //     return item+'\n'
  //   } else {
  //     return item
  //   }
  //   return item+'\n'
  // }).join('')
  return formatedStr
}

// console.log(textFormat(testStr,25,null,'null'));
textFormat(testStr,20,null,'null')
