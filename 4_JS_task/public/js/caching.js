function Cache(maxOfChacheResults) {
  this.resultsCache = Object.create(null)
  this.maxOfChacheResults = maxOfChacheResults;
}


  Cache.prototype.addToCache = function(funcName, arg, result) {
    if (funcName in this.resultsCache){
      this.resultsCache[funcName][arg] = result
    } else {
      this.resultsCache[funcName] = {}
      this.resultsCache[funcName][arg] = result
    }
    if (Object.keys(this.resultsCache[funcName]).length>this.maxOfChacheResults){
      delete  this.resultsCache[funcName][Object.keys(this.resultsCache[funcName])[0]]
    }
  }


  Cache.prototype.functionCache = function(){
    var func = arguments[0][0];
    [].shift.call(arguments[0]);
    var arg = [].map.call(arguments[0], function(item){
      if ((typeof item)==='number') return item
      return parseFloat(item)
    });
    var cacheResult = this.searchInCache(func.name, arg.toString())
    console.log(cache.resultsCache);
    if (cacheResult) return "result from cache: "+cacheResult
    var result = func.apply(null, arg);
    this.addToCache(func.name, arg.toString(), result);
    return "calced result: "+result
  }


  Cache.prototype.searchInCache = function(funcName,arg) {
    if (funcName in this.resultsCache){
      if (arg in this.resultsCache[funcName]) return this.resultsCache[funcName][arg]
      return false
    } else {
      return false
    }
  }


  Cache.prototype.deleteFunctionFromeCache = function(funcName) {
    if (funcName in this.resultsCache){
      delete this.resultsCache[funcName]
    }
  };


  Cache.prototype.diaplayChache = function() {
    var display = []
    for (key in this.resultsCache){
      var displayResults=[]
      for (prop in this.resultsCache[key]){
          displayResults.push('\n    '+prop+': '+this.resultsCache[key][prop])
      }
      display.push('\nfunction '+key+', arguments: '+displayResults)
    }
      return display;
  };


  Cache.prototype.setMaxOfChacheResults = function(value) {
    if (!isNaN(value)) this.maxOfChacheResults = value;
    for (key in this.resultsCache){
      this.deleteFunctionFromeCache(key)
    }
  }

var cache = new Cache(5);

function sum(a,b) {
  return a+b
}
function pow(a,b) {
  return Math.pow(a,b)
}
function ded(a,b) {
  return a-b
}
function multi(a,b) {
  return a*b
}
function div(a,b) {
  return a/b
}
