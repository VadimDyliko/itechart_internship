var stringCalculator={
  calc: function(mathStr) {
    var mathArr = mathStr.match(/(\d){1,}|(\+)|(\/)|(\*)|(\-)/g);
    mathArr = mathArr.map(function(item) {
      if (item.match(/(\d)+/)) return +item
      return item
    })
    console.log(mathArr);
    var ops = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < mathArr.length; j++) {
            if (ops[i][mathArr[j]]) {
                currentOp = ops[i][mathArr[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] =
                    currentOp(newCalc[newCalc.length - 1], mathArr[j]);
                currentOp = null;
            } else {
                newCalc.push(mathArr[j]);
            }
        }
        mathArr = newCalc;
        newCalc = [];
    }
    if (mathArr.length > 1) {
        console.log('Error: unable to resolve calculation');
        return mathArr;
    } else {
        return mathArr[0];
    }
  }
}

// console.log(stringCalculator.calc('224+35/5'))
// console.log(stringCalculator.calc('2+2'))
// console.log(stringCalculator.calc('4+4+2'))
// console.log(stringCalculator.calc('9/3/1'))
// console.log(stringCalculator.calc('224+35/5'))
