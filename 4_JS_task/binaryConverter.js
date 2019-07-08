const binaryConverter={
  convert: function(value, fromCountSys, toCountSys) {
    try{
      if (Array.isArray(value)){
        value = value.join('')
      }
      return  parseInt(value, fromCountSys).toString(toCountSys)
    } catch(err) {
      return 'error'
      console.log(err);
    }
  }
}
