var dateFormater = {
  monthes:{
    january:1,
    february:2,
    march:3,
    april:4,
    may:5,
    june:6,
    july:7,
    august:8,
    september:9,
    october:10,
    november:11,
    december:12
  },
  setDate: function(dateIn, regExpDateIn, regExpDateOut) {
    if (regExpDateIn) this.regExpDateIn = regExpDateIn
    else this.regExpDateIn = "DDMMYYYY"
    if (Number.isInteger(dateIn)){
      this.date = new Date(dateIn)
    } else {
      if (/Y{4}/.test(this.regExpDateIn) && /M{2}|MONTH/.test(this.regExpDateIn) && /D{2}/.test(this.regExpDateIn)){
        console.log(this.regExpDateIn.match(/Y{4}/));
        var year = (/MONTH/.test(this.regExpDateIn))?dateIn.match(/[\d]{4}/)[0]:dateIn.substring(this.regExpDateIn.search(/Y{4}/),this.regExpDateIn.search(/Y{4}/)+4);
        var month = (/MONTH/.test(this.regExpDateIn))?dateIn.match(/[^\d]{3,9}/)[0]:dateIn.substring(this.regExpDateIn.search(/M{2}/),this.regExpDateIn.search(/MM/)+2);
        if (isNaN(month)){
          month = this.monthes[month.toLowerCase()]
        }
        var day = dateIn.substring(this.regExpDateIn.search(/D{2}/),this.regExpDateIn.search(/DD/)+2);
        this.date = new Date(+year, +month-1, +day);
      } else {
        this.date = new Date()
        console.log('date seted to "now"');
      }
    }
    if (regExpDateOut) this.regExpDateOut = regExpDateOut
  },
  getDate: function() {
    var dateOut = this.regExpDateOut
    dateOut = dateOut.replace(/(Y{4})/g, this.date.getFullYear())
    dateOut = dateOut.replace(/(MONTH)/g, this.date.toLocaleString('en', { month: 'long' }))
    dateOut = dateOut.replace(/(M{2})/g, (+this.date.getMonth()+1<10)?'0'+(+this.date.getMonth()+1):this.date.getMonth()+1)
    dateOut = dateOut.replace(/(D{2})/g, (this.date.getDate()<10)?'0'+this.date.getDate():this.date.getDate())
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
