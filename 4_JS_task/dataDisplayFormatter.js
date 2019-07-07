var dataFormater = {
  setDate: function(dateIn, regExpDateIn, regExpDateOut) {
    if (regExpDateIn) this.regExpDateIn = regExpDateIn
    if (Number.isInteger(dateIn)){
      this.date = new Date(dateIn)
    } else {
      if (/Y{4}/.test(this.regExpDateIn) && /M{2}/.test(this.regExpDateIn) && /D{2}/.test(this.regExpDateIn)){
        var year = dateIn.substring(this.regExpDateIn.search(/Y{4}/),this.regExpDateIn.search(/YYYY/)+4);
        var month = dateIn.substring(this.regExpDateIn.search(/M{2}/),this.regExpDateIn.search(/MM/)+2);
        var day = dateIn.substring(this.regExpDateIn.search(/D{2}/),this.regExpDateIn.search(/DD/)+2);
        this.date = new Date(+year, +month-1, +day);
      } else {
        this.date = new Date()
      }
    }
    if (regExpDateOut) this.regExpDateOut = regExpDateOut
  },
  getDate: function() {
    var dateOut = this.regExpDateOut
    dateOut = dateOut.replace(/(Y{4})/g, this.date.getFullYear())
    dateOut = dateOut.replace(/(MONTH)/g, this.date.toLocaleString('en', { month: 'long' }))
    dateOut = dateOut.replace(/(M{2})/g, (this.date.getMonth()+1<10)?'0'+this.date.getMonth()+1:this.date.getMonth()+1)
    dateOut = dateOut.replace(/(D{2})/g, (this.date.getDate()+1<10)?'0'+this.date.getDate():this.date.getDate())
    return dateOut
  },
  date: Date.now(),
  regExpDateOut: "DD-MONTH-YYYY",
  regExpDateIn: "DDMMYYYY",
  fromNow: function() {
    return (
      Math.floor((Date.now()-this.date)/(1000*60*60*24*365))+' years ago'
    )
  }
}


// dataFormater.setDate("31102011")
// console.log(dataFormater.getDate())
//dataFormater.setDate("20130431","YYYYMMDD")
//console.log(dataFormater.getDate())
// dataFormater.setDate("20130431","YYYYMMDD")
// console.log(dataFormater.getDate())
// dataFormater.setDate("20130431","YYYYMMDD","MM-DD-YYYY")
// console.log(dataFormater.getDate())
//console.log(dataFormater.fromNow())
