function DataFormater(dateStr, regExpDateIn, regExpDateOut){
  this.regExpDateIn = regExpDateIn;
  this.dateStr = dateStr;
  this.year = this.dateStr.substring(this.regExpDateIn.search(/YYYY/),this.regExpDateIn.search(/YYYY/)+4)
  this.month = this.dateStr.substring(this.regExpDateIn.search(/MM/),this.regExpDateIn.search(/MM/)+2)
  this.date = this.dateStr.substring(this.regExpDateIn.search(/DD/),this.regExpDateIn.search(/DD/)+2)
}

let formater = new DataFormater("20130431", "YYYYMMDD")

console.log(formater);
