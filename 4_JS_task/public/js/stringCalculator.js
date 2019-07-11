var stringCalculator = {
  calc: function(mathStr) {
    var mathArr = mathStr.match(/(\d){1,}|(\+)|(\/)|(\*)|(\-)/g);
    mathArr = mathArr.map(function(item) {
      if (item.match(/(\d)+/)) return +item;
      return item;
    });
    var ops = [
      {
        "^": function(a, b) {
          return Math.pow(a, b);
        }
      },
      {
        "*": function(a, b) {
          return a * b;
        },
        "/": function(a, b) {
          return a / b;
        }
      },
      {
        "+": function(a, b) {
          return a + b;
        },
        "-": function(a, b) {
          return a - b;
        }
      }
    ];
    var newCalc = [],
      currentOp;
    for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < mathArr.length; j++) {
        if (ops[i][mathArr[j]]) {
          currentOp = ops[i][mathArr[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] = currentOp(
            newCalc[newCalc.length - 1],
            mathArr[j]
          );
          currentOp = null;
        } else {
          newCalc.push(mathArr[j]);
        }
      }
      mathArr = newCalc;
      newCalc = [];
    }
    return mathArr[0];
  }
};
