const binaryConverter={
  convert: function(value, countSys) {
    return parseFloat(value).toString(countSys)
  }
}

console.log(binaryConverter.convert(51,2))
console.log(binaryConverter.convert(110011,10))
