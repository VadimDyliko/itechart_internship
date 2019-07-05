import React from 'react';
import './CityRandomizer.css';
import GetDataBtn from './GetDataBtn/GetDataBtn'
import LastGeneratedPair from './LastGeneratedPair/LastGeneratedPair'
import AllGeneratedPairs from './AllGeneratedPairs/AllGeneratedPairs'

class CityRandomizer extends React.Component {
  state={
    adjectives: [],
    cities: [],
    lastGeneratedPair: 'none',
    generatedPairs: [],
    maxValueGeneratedPairs: 0,
    valueOfGeneratedPairs: 0,
    isBtnEnable: true
  }


  componentDidMount() {
    this.getData();
  }


  getData=()=>{
    fetch('https://gp-js-test.herokuapp.com/api')
      .then((response)=>response.json())
      .then((data)=>{
        this.setState({
          adjectives: data.adjectives,
          cities: data.cities
        })
      })
      .then(()=>this.setMaxValueOfPairs())
  }


  setMaxValueOfPairs=()=>{
    this.setState({maxValueGeneratedPairs: ((this.state.cities.length+this.state.adjectives.length)/2).toFixed(0)})
  }


  isCountOfPairsValid=()=>{
    if (this.state.valueOfGeneratedPairs+1<this.state.maxValueGeneratedPairs) return true;
    return false;
  }


  generatePair=()=>{
      let adjective = this.getRandomValue(this.state.adjectives);
      let city = this.getRandomValue(this.state.cities);
      this.appendNewPair(adjective, city);
  }


  getRandomValue=(arr)=>{
    if (Array.isArray(arr)){
      let randomItem = arr[Math.floor(Math.random() * arr.length)];
      let arrString = this.state.generatedPairs.join(' ');
      let regExpRandomItem = new RegExp(randomItem, 'i');
      if (arrString.search(regExpRandomItem)>(-1)){
        return (this.getRandomValue(arr));
      } else {
        return randomItem[0].toUpperCase() + randomItem.slice(1);
      }
    }else{
      throw new Error('Bad argument for getRandomValue function');
    }
  }


  appendNewPair=(adjective, city)=>{
    let newPair = `${adjective} ${city}`;
    let pairs = [...this.state.generatedPairs];
    pairs.push(newPair);
    this.setState({generatedPairs: pairs, valueOfGeneratedPairs: this.state.valueOfGeneratedPairs+1, lastGeneratedPair: newPair, isBtnEnable: (this.isCountOfPairsValid())?true:false});
  }


  render(){
    return(
      <div className="city-randomizer">
        <GetDataBtn isBtnEnable={this.state.isBtnEnable} action={this.generatePair}/>
        <LastGeneratedPair lastPair={this.state.lastGeneratedPair}/>
        <p>{this.state.valueOfGeneratedPairs}/{this.state.maxValueGeneratedPairs} pairs</p>
        <AllGeneratedPairs generatedPairs={this.state.generatedPairs}/>
      </div>
    )
  }
}

export default CityRandomizer;
