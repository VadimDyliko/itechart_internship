
class Car {
 constructor(hp, color){
   this.hp = hp
   this.color = color
 }

 getHP(){
   return this.hp
 }

 getColor(){
   return this.color
 }
}


const CarFactory = {
  makeDoor : (hp, color) => new Car(hp, color)
}

const car = CarFactory.makeDoor(115, 'black')
console.log('Horse power:', car.getHP())
console.log('Color:', car.getColor())
