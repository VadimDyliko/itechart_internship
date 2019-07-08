function Cache() {
  this.resultsCache = Object.create(null)
  this.maxOfChacheResults = 3;
  this.addToCache = function(funcName, arg, result) {
    this.resultsCache[funcName] = {}
    this.resultsCache[funcName][arg] = result
    if (Object.keys(this.resultsCache[funcName]).length>this.maxOfChacheResults){
      // Object.keys(this.resultsCache[funcName][arg]).shift()
      console.log('max');
    }
    //console.log(Object.keys(this.resultsCache[funcName]).length);
  }
  this.functionCache = function(func,...arg){
    arg = arg.map(function(item){
      if ((typeof item)==='number') return parseFloat(item)
      return item
    })
    let cacheResult = this.searchInCache(func.name, arg.toString())
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

let cache = new Cache()
console.log(cache.functionCache(sum, 5, 2))
console.log(cache.functionCache(sum, 5, 2))
console.log(cache.functionCache(sum, 3, 2))
console.log(cache.functionCache(sum, 3, 2))
console.log(cache.functionCache(sum, 4, 2))
console.log(cache.functionCache(sum, 4, 2))
console.log(cache.functionCache(sum, 1, 2))
console.log(cache.functionCache(sum, 1, 2))


console.log(cache.resultsCache);

function sum(a,b) {
  return a+b
}
