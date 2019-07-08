function Cache(maxOfChacheResults) {
  this.resultsCache = Object.create(null)
  this.maxOfChacheResults = maxOfChacheResults;
  this.addToCache = function(funcName, arg, result) {
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
  this.functionCache = function(func,...arg){
    console.log(arg);
    arg = arg.map(function(item){
      if ((typeof item)==='number') return parseFloat(item)
      return item
    })

    let cacheResult = this.searchInCache(func.name, arg.toString())
    console.log(cache.resultsCache);
    if (cacheResult) return cacheResult+" result from cache"
    let result = func.apply(null, arg);
    this.addToCache(func.name, arg.toString(), result);
    return result+" calc result"
  }
  this.searchInCache = function(funcName,arg) {
    if (funcName in this.resultsCache){
      if (arg in this.resultsCache[funcName]) return this.resultsCache[funcName][arg]
      return false
    } else {
      return false
    }
  }
  this.deleteFunctionFromeCache = function(funcName) {
    if (funcName in this.resultsCache){
      delete this.resultsCache[funcName]
    }
  }
}

let cache = new Cache(2)
// console.log(cache.functionCache(sum, 5, 2))
// console.log(cache.functionCache(sum, 4, 4))
// console.log(cache.functionCache(sum, 3, 2))
// console.log(cache.functionCache(sum, 2, 4))
// console.log(cache.functionCache(sum, 1, 4))







function sum(a,b) {
  return a+b
}
function pow(a,b) {
  return a*b
}
