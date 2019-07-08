function arrayProcessingToolHandler(e,strArr) {
  console.log(e.target.innerHTML);
  var arr = strArr.value.split(','), result;
  if (e.target.name === 'subSumOn2'){
    result = arrayProcessingTool.subSumOn2(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'subSumOn'){
    result = arrayProcessingTool.subSumOn(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'searchMediane'){
    result = arrayProcessingTool.searchMediane(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'selectionTask'){
    result = arrayProcessingTool.selectionTask(arr.map(function(item){return parseFloat(item)}))
  }
  document.getElementById('first-task__output').value = result;
}

function dataFormaterHandler(e, dateInput, regExpDateInInput, regExpDateOut) {
  if (e.target.name === 'setDate'){
    dataFormater.setDate(dateInput, regExpDateInInput, regExpDateOut)
  } else if (e.target.name === 'getDate'){
    document.getElementById('second-task__output').value = dataFormater.getDate()
  } else if (e.target.name === 'fromNow'){
    document.getElementById('second-task__output').value = dataFormater.fromNow()
  }
}

function textFormatterHandler(str, maxCols, maxRows, typeOfWarp){
  formatedTextOutput.value = textFormat(str, maxCols, maxRows, typeOfWarp)
}

function stringCalculatorHandler(mathStr) {
  document.getElementById('mathOutput').value = stringCalculator.calc(mathStr)
}


function arraySorterhandler(e, strArr) {
  console.log(strArr);
  console.log(e.target.innerHTML);
  var arr = strArr.split(','), result;
  if (e.target.name === 'mergeSort'){
    result = arraySorter.mergeSort(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'quickSort'){
    result = arraySorter.quickSort(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'selectionSort'){
    result = arraySorter.selectionSort(arr.map(function(item){return parseFloat(item)}))
  } else if (e.target.name === 'simpleCountingSort'){
    result = arraySorter.simpleCountingSort(arr.map(function(item){return parseFloat(item)}))
  }
  document.getElementById('fifthArrOutput').value = result;
}


function binaryConverterHandler(value, fromCountSys, toCountSys) {
  document.getElementById('convertedOutput').value = binaryConverter.convert(value, fromCountSys, toCountSys)
}
