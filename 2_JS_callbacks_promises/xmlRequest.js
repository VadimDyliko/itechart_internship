const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function promiseAsyncRequestPosts(url) {
  return new Promise((res,rej)=>{
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function() {
      if (this.status === 200){
        let posts = this.responseText;
        res(posts);
      } else {
        let err = new Error(this.statusText);
        rej(err);
      }
    }
    req.send();
  })
}

function callbackAsyncRequestPosts(url, callback) {
  let req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    if (this.status === 200){
      let posts = this.responseText;
      callback(posts);
    } else {
      let err = new Error(this.statusText);
    }
  }
  req.send();
}

function syncRequstPosts(url) {
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();
  let posts = req.responseText;
  return posts;
}

module.exports.promiseAsyncRequestPosts = promiseAsyncRequestPosts;
module.exports.callbackAsyncRequestPosts = callbackAsyncRequestPosts;
module.exports.syncRequstPosts = syncRequstPosts;
