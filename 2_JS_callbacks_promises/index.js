const {promiseAsyncRequestPosts, callbackAsyncRequestPosts, syncRequstPosts} = require('./xmlRequest');
const {syncAppendToFile, callbackAsyncAppendFile, promiseAsyncAppendFile} = require('./saveToFile');
const fetch = require('node-fetch');

const url = 'https://jsonplaceholder.typicode.com/posts/1'

promiseAsyncRequestPosts(url)
  .then(data=>callbackAsyncAppendFile(data));

promiseAsyncRequestPosts(url)
  .then(data=>promiseAsyncAppendFile(data))
  .then(()=>console.log('data appended async'));

callbackAsyncRequestPosts(url, callbackAsyncAppendFile);

syncAppendToFile(syncRequstPosts(url));

fetch(url)
    .then(res =>res.text())
    .then(data => promiseAsyncAppendFile(data))
    .then(()=>console.log('data appended async'));
