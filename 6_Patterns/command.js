  let carManager = {

    requestInfo( model, id ){
      return `The information for ${model} with ID ${id} is foobar`;
    },

    buyVehicle( model, id ){
      return `You have successfully purchased Item ${id}, a ${model}`;
    },

    arrangeViewing( model, id ){
      return `You have successfully booked a viewing of ${model} ( ${id} ) `;
    }
  };

carManager.execute = function ( name ) {
  return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

console.log(carManager.execute( "arrangeViewing", "Ferrari", "14523" ));
console.log(carManager.execute( "requestInfo", "Ford Mondeo", "54323" ));
