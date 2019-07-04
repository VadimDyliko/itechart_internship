import React from 'react';
import './CityRandomizer.css';

class CityRandomizer extends React.Component {
  state={
    adjectives: [],
    cities: [],
    currentAdjective: '',
    currentCity: '',
    lastGeneratedPair: 'none',
    generatedPairs: [],
    maxValueGeneratedPairs: 10,
    valueOfGeneratedPairs: 0,
  }


  componentDidMount() {
    this.getData();
  }


  getData=()=>{
    console.log('fetch to API');
    fetch('https://gp-js-test.herokuapp.com/api')
      .then((response)=>response.json())
      .then((data)=>{
        this.setState({
          adjectives: data.adjectives,
          cities: data.cities
        })
      })
  }


  generatePair=()=>{
    let adjective = this.getRandomValue(this.state.adjectives)
    let city = this.getRandomValue(this.state.cities)
    this.appendNewPair(adjective, city)
  }


  getRandomValue=(arr)=>{
    if (Array.isArray(arr)){
      let randomItem = arr[Math.floor(Math.random() * arr.length)];
      console.log(randomItem);
        




      return (randomItem)
    }else{
      console.log(typeof arr);
      throw new Error('Bad argument for getRandomValue function');
    }
  }


  appendNewPair=(adjective, city)=>{
    let newPair = `${adjective} ${city}`;
    let pairs = [...this.state.generatedPairs];
    pairs.push(newPair);
    this.setState({generatedPairs: pairs, valueOfGeneratedPairs: this.state.valueOfGeneratedPairs+1, lastGeneratedPair: newPair});
  }
  // generaePair=()=>{
  //   console.log('fetch to API');
  //   fetch('https://gp-js-test.herokuapp.com/api')
  //     .then((response)=>response.json())
  //     .then((data)=>{
  //       this.setState({
  //         adjectives: data.adjectives,
  //         cities: data.cities
  //       })
  //     })
  //     .then(()=>this.getRandomValue(this.state.adjectives))
  //     .then((randomAdjective)=>this.setState({currentAdjective: randomAdjective}))
  //     .then(()=>this.getRandomValue(this.state.cities))
  //     .then((randomCity)=>this.setState({currentCity: randomCity}))
  //     .then(()=>this.appendNewPair())
  //     .catch((err)=>console.log(err))
  // }

  // getRandomValue=(arr)=>{
  //     if (Array.isArray(arr)){
  //       let randomItem = arr[Math.floor(Math.random() * arr.length)];
  //       let someArr = this.state.generatedPairs.join(' ').split(' ');
  //       if(!someArr.some((item, i)=>{
  //         if (item===randomItem) return true;
  //         return false;
  //       })) {
  //         return randomItem;
  //       } else {
  //         console.log(randomItem);
  //         this.generaePair();
  //         throw new Error('There is not valid item, doing get request to the API');
  //       }
  //     } else {
  //       throw new Error('Bad argument for getRandomValue function');
  //     };
  // }

  // appendNewPair=()=>{
  //   if (this.state.valueOfGeneratedPairs < this.state.maxValueGeneratedPairs){
  //     let newPair = `${this.state.currentAdjective} ${this.state.currentCity}`;
  //     let pairs = [...this.state.generatedPairs];
  //     pairs.push(newPair);
  //     this.setState({generatedPairs: pairs, valueOfGeneratedPairs: this.state.valueOfGeneratedPairs+1});
  //   } else {
  //     return
  //   }
  // }

  render(){
    return(
      <div className="city-randomizer">
        <button className="city-randomizer__get-data-button" onClick={this.generatePair}>Generate pair</button>
        <input className="city-randomizer__last-gerated-pair" type="text" value={this.state.lastGeneratedPair} readOnly></input>
        <textarea className="city-randomizer__all-generated-pairs" defaultValue={
            this.state.generatedPairs.map((item,i)=>{
              return `\n${i+1}) ${item}`
            })

          }></textarea>
        <p>{this.state.valueOfGeneratedPairs}/{this.state.maxValueGeneratedPairs}</p>
      </div>
    )
  }
}

export default CityRandomizer;
