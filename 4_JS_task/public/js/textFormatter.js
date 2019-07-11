function textFormat(str, maxCols, maxRows, typeOfWarp) {
  var formatedStr,
    formatedArr,
    regExp,
    strSymbols = "";
  if (maxRows != 0) strSymbols = Math.ceil(str.length / maxRows);
  if (maxCols != 0) strSymbols = maxCols - 1;
  switch (typeOfWarp) {
    case "word":
      regExp = new RegExp("[^]{0," + strSymbols + "}[\\s,\\n|.]", "gi");
      break;
    case "symbol":
      regExp = new RegExp("[^]{0," + strSymbols + "}", "gi");
      break;
    case "suggestions":
      regExp = new RegExp("[A-Z][\\w\\d\\s-,]+[\\.\\!\\?]", "g");
      break;
    default:
      regExp = str;
  }
  formatedArr = str.match(regExp);
  return formatedArr.join("\n");
}
