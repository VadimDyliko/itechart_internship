function Calculator() {
  var methods = {
    "-": function(a, b) {
      return a - b;
    },
    "+": function(a, b) {
      return a + b;
    }
  };

  this.calculate = function(str) {

    var split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2]

    if (!methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return methods[op](a, b);
  }

  this.addMethod = function(name, func) {
    methods[name] = func;
  };
}


var calc = new Calculator;

calc.addMethod("*", function(a, b) {
  return a * b;
});
calc.addMethod("/", function(a, b) {
  return a / b;
});
calc.addMethod("**", function(a, b) {
  return Math.pow(a, b);
});


console.log(calc.calculate("2 + 3"))



























// let stringCalculator = {
//   sum: function(a,b) {
//     return(
//       parseFloat(a)+parseFloat(b)
//     )
//   },
//
//   deg: function(a,b) {
//     return(
//       parseFloat(a)-parseFloat(b)
//     )
//   },
//
//   sqrt: function(a) {
//     return(
//       Math.sqrt(parseFloat(a))
//     )
//   },
//
//   pow: function(m,n) {
//     return(
//       Math.pow(parseFloat(m),parseFloat(n))
//     )
//   },
//
//   sin: function(a) {
//     return(
//       Math.sin(parseFloat(a))
//     )
//   },
//
//   cos: function(a) {
//     return(
//       Math.cos(parseFloat(a))
//     )
//   },
// }
//
// console.log(stringCalculator.pow('2',stringCalculator.pow('2','2')));
