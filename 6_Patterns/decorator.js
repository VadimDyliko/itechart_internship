let User = function (name) {
  this.name = name;
}
User.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
}

let vadim = new User('Vadim');
vadim.hobbies = ['Airsoft', 'Running'];
vadim.greet = function() {
  User.prototype.greet.call(this);
  console.log('My hobbies are: ', this.hobbies);
};
vadim.greet();
