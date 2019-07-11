function arrayProcessingToolHandler(e, strArr) {
  var arr = strArr.value.split(","),
    result;
  if (e.target.name === "subSumOn2") {
    result = arrayProcessingTool.subSumOn2(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "subSumOn") {
    result = arrayProcessingTool.subSumOn(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "searchMediane") {
    result = arrayProcessingTool.searchMediane(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "selectionTask") {
    result = arrayProcessingTool.selectionTask(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else {
    return;
  }
  document.getElementById("first-task__output").value = result;
}

function dataFormaterHandler(e, dateInput, regExpDateInInput, regExpDateOut) {
  if (e.target.name === "setDate") {
    dateFormater.setDate(dateInput, regExpDateInInput, regExpDateOut);
    document.getElementById("second-task__output").value = "date seted";
  } else if (e.target.name === "getDate") {
    document.getElementById(
      "second-task__output"
    ).value = dateFormater.getDate();
  } else if (e.target.name === "fromNow") {
    document.getElementById(
      "second-task__output"
    ).value = dateFormater.fromNow();
  } else {
    return;
  }
}

function textFormatterHandler(str, maxCols, maxRows, typeOfWarp) {
  document.getElementById("formatedTextOutput").value = textFormat(
    str,
    maxCols,
    maxRows,
    typeOfWarp
  );
}

function maxColsInputHandler() {
  document.getElementById("maxRowsInput").value = 0;
}

function maxRowsInputHandler() {
  document.getElementById("maxColsInput").value = 0;
}

function stringCalculatorHandler(mathStr) {
  document.getElementById("mathOutput").value = stringCalculator.calc(mathStr);
}

function arraySorterhandler(e, strArr) {
  var arr = strArr.split(","),
    result;
  if (e.target.name === "mergeSort") {
    result = arraySorter.mergeSort(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "quickSort") {
    result = arraySorter.quickSort(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "selectionSort") {
    result = arraySorter.selectionSort(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "simpleCountingSort") {
    result = arraySorter.simpleCountingSort(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "bubbleSort") {
    result = arraySorter.bubbleSort(
      arr.map(function(item) {
        return parseFloat(item);
      })
    );
  } else if (e.target.name === "clear") {
    result = "";
  } else {
    return;
  }
  document.getElementById("fifthArrOutput").value = result;
}

function binaryConverterHandler(value, fromCountSys, toCountSys) {
  document.getElementById("convertedOutput").value = binaryConverter.convert(
    value,
    fromCountSys,
    toCountSys
  );
}

function cacheHandler() {
  document.getElementById("cacheResultsOutput").value = cache.functionCache(
    arguments
  );
  document.getElementById("cacheReault").value = cache.diaplayChache();
}

function deleteFunctionFromeCacheHandler(funcName) {
  cache.deleteFunctionFromeCache(funcName);
  document.getElementById("cacheReault").value = cache.diaplayChache();
}

function setMaxOfChacheResultsHandler(value) {
  cache.setMaxOfChacheResults(value);
  document.getElementById("cacheReault").value = cache.diaplayChache();
}
