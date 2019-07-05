var testArr = [1, 3, 7, 4, 6, 7, 8, 1, 2, 5, 7, 8, 90, 1]

//getMaxSubSum([-1, 2, 3, -9]) = 5

const arrayProcessingTool = {
  subSum: function(arr){
            var sum = 0;
            var max = 0;
            for(var i=0;i<arr.length;i++){
                for(var p=i;p<arr.length;p++){
                    sum += arr[p];
                    if(sum < 0){
                        continue;
                    }else if(sum > max){
                        max = sum;
                    }
                }
                sum = 0;
            }
            return max
        },
    search: function(arr) {
      //sortFromMaxToMin
      var arrMaxMin = arr.concat()
      arrMaxMin.sort((a,b)=>{
        if(a<b) return 1;
        if(a>b) return -1;
      })
      //sortFromMinToMax
      var arrMinMax = arr.concat()
      arrMinMax.sort((a,b)=>{
        if(a<b) return -1;
        if(a>b) return 1;
      })
      function searchMediane(arr) {
        console.log(arr.length%2);
        if (!arr.length%2){
          let index = (arr.length/2)+1
          console.log(index);
          return index
        } else {

        }
      }
      searchMediane(arrMaxMin)
      return (`${arrMaxMin} ${arrMinMax}`)
    },

    selectionTask: function(arr) {
      var startIndex, endIndex
      for (var i=0; i<arr.length; i++){
        if (arr[i]>arr[i+1]){
          endIndex = i
        } else {
          startIndex = i
        }
      }
      console.log(startIndex, endIndex);
    }
}

console.log(arrayProcessingTool.selectionTask(testArr));
// console.log(arrayProcessingTool.subSum(testArr));
// console.log(arrayProcessingTool.subSum([-1, 2, 3, -9]));
// console.log(arrayProcessingTool.subSum([2, -1, 2, 3, -9]));
// console.log(arrayProcessingTool.subSum([-1, 2, 3, -9, 11]));
// console.log(arrayProcessingTool.subSum([-100, -9, -2, -3, -5]));
