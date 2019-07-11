var arraySorter = {
  quickSort: function(arr) {
    console.log("quickSort");
    if (arr.length == 0) return [];
    var a = [],
      b = [],
      p = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] < p) a[a.length] = arr[i];
      else b[b.length] = arr[i];
    }
    return this.quickSort(a).concat(p, this.quickSort(b));
  },

  selectionSort: function(arr) {
    console.log("selectionSort");
    for (var i = 0; i < arr.length - 1; i++) {
      var min = i;
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j;
      }
      var t = arr[min];
      arr[min] = arr[i];
      arr[i] = t;
    }
    return arr;
  },

  simpleCountingSort: function(arr) {
    console.log("simpleCountingSort");
    var count = [],
      sequenceArr = [];
    for (var i = 0; i < arr.length; i++) {
      count[i] = 0;
    }
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] < arr[j]) count[j]++;
        else count[i]++;
      }
    }
    for (var i = 0; i < arr.length; i++) {
      sequenceArr[count[i]] = arr[i];
    }
    return sequenceArr;
  },

  bubbleSort: function(arr) {
    console.log("bubbleSort");
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j + 1] < arr[j]) {
          var t = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = t;
        }
      }
    }
    return arr;
  },

  mergeSort: function(arr) {
    console.log("mergeSort");
    function Merge(a, low, mid, high) {
      var b = new Array(high + 1 - low),
        h,
        i,
        j = mid + 1,
        k,
        h = low,
        i = 0;
      while (h <= mid && j <= high) {
        if (a[h] <= a[j]) {
          b[i] = a[h];
          h++;
        } else {
          b[i] = a[j];
          j++;
        }
        i++;
      }
      if (h > mid) {
        for (k = j; k <= high; k++) {
          b[i] = a[k];
          i++;
        }
      } else {
        for (k = h; k <= mid; k++) {
          b[i] = a[k];
          i++;
        }
      }
      for (k = 0; k <= high - low; k++) {
        a[k + low] = b[k];
      }
      return a;
    }
    function mergeSort(a, low, high) {
      if (low < high) {
        var mid = Math.floor((low + high) / 2);
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        Merge(a, low, mid, high);
      }
    }
    mergeSort(arr, 0, arr.length - 1);
    return arr;
  }
};
