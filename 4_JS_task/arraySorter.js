let testArr = [2,5,8,1,3,8,10,25,9]

var arraySorter = {
  mergeSort: function(arr){
    function Merge(a,low,mid,high){
      var b = new Array(high+1-low), h, i, j = mid+1, k, h = low, i = 0;
      while (h<=mid && j<=high){
        if (a[h]<=a[j]){
          b[i]=a[h];
          h++;
        } else {
          b[i]=a[j];
          j++;
        }
        i++;
      }
      if (h>mid){
        for (k=j; k<=high; k++){
          b[i]=a[k];
          i++;
        }
      } else {
        for (k = h; k <= mid; k++){
          b[i]=a[k]; i++;
        }
      }
      for (k=0; k<=high-low; k++) {
        a[k+low]=b[k]
      }
      return a;
    }
    function mergeSort(a,low,high){
      if (low < high){
        var mid = Math.floor((low+high)/2);
        mergeSort(a, low, mid);
        mergeSort(a, mid+1, high);
        Merge(a, low, mid, high);
      }
    }
    var n = arr.length;
    mergeSort(arr, 0, n-1);
    return arr;
  },


  quickSort: function(arr){
    if (arr.length == 0) return [];
    var a = [], b = [], p = arr[0];
    for (var i=1; i<arr.length; i++){
      if (arr[i]<p) a[a.length] = arr[i];
      else b[b.length] = arr[i];
    }
    return this.quickSort(a).concat( p,this.quickSort(b) );
  },


  selectionSort:function(arr){
    var n = arr.length;
    for (var i=0; i<n-1; i++){
      var min = i;
      for (var j=i+1; j<n; j++){
        if (arr[j]<arr[min]) min = j;
      }
      var t = arr[min];
      arr[min] = arr[i];
      arr[i] = t;
    }
    return arr;
  },

  simpleCountingSort:function(arr){
    var n = arr.length, Count = [], B = [];
    for (var i=0; i<n; i++) {
      Count[i] = 0
    }
    for (var i=0; i<n-1; i++){
      for (var j=i+1; j<n; j++){
        if (arr[i] < arr[j]) Count[j]++;
        else Count[i]++;
      }
    }
    for (var i=0; i<n; i++) {
      B[Count[i]] = arr[i]
    }
    return B;
  }
}

// console.log(arraySorter.mergeSort(testArr));
// console.log(arraySorter.quickSort(testArr));
// console.log(arraySorter.selectionSort(testArr));
// console.log(arraySorter.simpleCountingSort(testArr));
