const fs = require('fs');

function syncAppendToFile(data) {
  try{
    fs.appendFileSync(__dirname+'/syncData.txt', `${data}\n`, 'utf8');
    console.log('data appended sync');
  } catch (err){
    throw err
  }
}

function callbackAsyncAppendFile(data, callback) {
  fs.appendFile(__dirname+'/asyncData.txt', `${data}\n`, 'utf8', (err) => {
  if (!err) {
    if (callback) callback();
    console.log('data appended async');
  } else {
    throw err;
  }
});
}

function promiseAsyncAppendFile(data) {
  return new Promise((res, rej)=>{
    fs.appendFile(__dirname+'/asyncData.txt', `${data}\n`, 'utf8', (err) => {
      if (!err) {
        res();
      } else {
        rej(err);
      }
    })
  })
}


module.exports.syncAppendToFile = syncAppendToFile;
module.exports.callbackAsyncAppendFile = callbackAsyncAppendFile;
module.exports.promiseAsyncAppendFile = promiseAsyncAppendFile;
