var arrayProcessingTool = {
  subSumOn2: function(arr) {
    var sum = 0,
      max = 0;
    for (var i = 0; i < arr.length; i++) {
      for (var j = i; j < arr.length; j++) {
        sum += arr[j];
        if (sum < 0) {
          continue;
        } else if (sum > max) {
          max = sum;
        }
      }
      sum = 0;
    }
    return max;
  },

  subSumOn: function(arr) {
    var max = 0,
      sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
      max = Math.max(max, sum);
      if (sum < 0) sum = 0;
    }
    return max;
  },

  searchMediane: function(arr) {
    var minMediane, maxMediane;
    var maxMinArr = arr.concat().sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
    });
    var minMaxArr = arr.concat().sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
    if (arr.length % 2 === 0) {
      maxMediane =
        (minMaxArr[Math.floor(arr.length / 2)] +
          minMaxArr[Math.floor(arr.length / 2) - 1]) /
        2;
      minMediane =
        (maxMinArr[Math.floor(arr.length / 2)] +
          maxMinArr[Math.floor(arr.length / 2) - 1]) /
        2;
      return " max mediane:" + maxMediane + "\n min mediane:" + minMediane;
    } else {
      maxMediane = minMaxArr[Math.floor(arr.length / 2)];
      minMediane = maxMinArr[Math.floor(arr.length / 2)];
      return "max mediane:" + maxMediane + "\nmin mediane:" + minMediane;
    }
  },

  selectionTask: function(arr) {
    var sequenceArr = [arr[0]],
      temporaryArr = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] >= arr[i - 1]) {
        temporaryArr.push(arr[i]);
      } else {
        if (temporaryArr.length > sequenceArr.length) {
          sequenceArr = temporaryArr;
        }
        temporaryArr = [arr[i]];
      }
    }
    if (temporaryArr.length > sequenceArr.length) {
      sequenceArr = temporaryArr;
    }
    return sequenceArr;
  }
};
