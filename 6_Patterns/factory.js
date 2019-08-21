function Cat(options) {
  this.sound = 'Meow';
  this.name = options.name;
}
function Dog(options) {
  this.sound = 'Rawr';
  this.name = options.name;
}

function AnimalFactory() {}

AnimalFactory.prototype.animalType = Cat;

AnimalFactory.prototype.createAnimal = function(options) {
  switch(options.animalType) {
    case "cat":
      this.animalType = Cat;
      break;
    case "dog":
      this.animalType = Dog;
      break;
    default:
      this.animalType = Cat;
      break;
  }
  return new this.animalType(options);
}
var animalFactory = new AnimalFactory();
var doge = animalFactory.createAnimal({
  animalType: 'dog',
  name: 'Doge'
});
var snowball = animalFactory.createAnimal({name: 'Snowball'});
console.log(doge instanceof Dog);
console.log(doge);
console.log(snowball instanceof Cat);
console.log(snowball);
