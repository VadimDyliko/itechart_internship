let testArr = [2,5,8,1,3,8,10,25,9]

var arraySorter = {
  mergeSort: function(Arr){
    function Merge(a,low,mid,high){
      var b = new Array(high+1-low), h, i, j = mid+1, k, h = low, i = 0;
      while (h <= mid && j <= high )
      { if (a[h] <= a[j]){ b[i]=a[h]; h++; }
      else             { b[i]=a[j]; j++; }
      i++;
    }
    if (h > mid){ for (k = j; k <= high; k++){ b[i]=a[k]; i++; } }
    else        { for (k = h; k <= mid; k++){  b[i]=a[k]; i++; } }
    for (k=0; k<=high-low; k++) a[k+low]=b[k];
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
  var n = Arr.length;
  mergeSort(Arr, 0, n-1);
  return Arr;
},


  quickSort: function(Arr){
    if (Arr.length == 0) return [];
    var a = [], b = [], p = Arr[0];
    for (var i=1; i<Arr.length; i++){
      if (Arr[i]<p) a[a.length] = Arr[i];
      else b[b.length] = Arr[i];
    }
    return this.quickSort(a).concat( p,this.quickSort(b) );
  },


  selectionSort:function(Arr){
    var n = Arr.length;
    for (var i=0; i<n-1; i++){
      var min = i;
      for (var j=i+1; j<n; j++){
        if (Arr[j]<Arr[min]) min = j;
      }
      var t = Arr[min]; Arr[min] = Arr[i]; Arr[i] = t;
    }
    return Arr;
  },

  simpleCountingSort:function(Arr){
    var n = Arr.length, Count = [], B = [];
    for (var i=0; i<n; i++) Count[i] = 0;
    for (var i=0; i<n-1; i++)
    { for (var j=i+1; j<n; j++)
      { if (Arr[i] < Arr[j]) Count[j]++;
        else Count[i]++;
      }
    }
    for (var i=0; i<n; i++) B[Count[i]] = Arr[i];
    return B;
  }
}

// console.log(arraySorter.mergeSort(testArr));
// console.log(arraySorter.quickSort(testArr));
// console.log(arraySorter.selectionSort(testArr));
// console.log(arraySorter.simpleCountingSort(testArr));
