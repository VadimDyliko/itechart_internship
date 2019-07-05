let stringCalculator = {
  sum: function(a,b) {
    return(
      parseFloat(a)+parseFloat(b)
    )
  },

  deg: function(a,b) {
    return(
      parseFloat(a)-parseFloat(b)
    )
  },

  sqrt: function(a) {
    return(
      Math.sqrt(parseFloat(a))
    )
  },

  pow: function(m,n) {
    return(
      Math.pow(parseFloat(m),parseFloat(n))
    )
  },

  sin: function(a) {
    return(
      Math.sin(parseFloat(a))
    )
  },

  cos: function(a) {
    return(
      Math.cos(parseFloat(a))
    )
  },
}

console.log(stringCalculator.pow('2','2'));
