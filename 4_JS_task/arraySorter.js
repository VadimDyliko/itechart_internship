let testArr = [1,3,4,5,7,9]

const arraySorter = {
  sortFromMaxToMin: function(arr) {
    arr.sort((a,b)=>{
      if(a<b) return 1;
      if(a>b) return -1;
    })
    return arr
  },
  sortFromMinToMax: function(arr) {
    arr.sort((a,b)=>{
      if(a<b) return -1;
      if(a>b) return 1;
    })
    return arr
  }
}

console.log(arraySorter.sortFromMinToMax(testArr));
