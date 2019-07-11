var binaryConverter = {
  convert: function(value, fromCountSys, toCountSys) {
    console.log(value, fromCountSys, toCountSys);
    var dec, result;
    dec = this.convertManualToDec(value, fromCountSys);
    console.log(dec);
    return result = this.convertManual(dec, toCountSys);
  },
  symbols: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  convertManualToDec: function(value, fromCountSys) {
    var result = 0;
    if (Array.isArray(value)) {
      value = value.join("");
    }
      var sysSymbols = this.symbols.slice(0, fromCountSys);
      for (var i = 0; i < value.length; i++) {
        result = result + sysSymbols.indexOf(value.substr(value.length - i - 1, 1)) * Math.pow(fromCountSys, i);
      }
      return result;

  },
  convertManual: function(value, toCountSys) {
    var result = "";
    var sysSymbols = this.symbols.slice(0, toCountSys);
    while (value > 0) {
      result = String(result) + sysSymbols[value % toCountSys];
      value = Math.floor(value / toCountSys);
    }
    return result.split("").reverse().join("");
  }
};
