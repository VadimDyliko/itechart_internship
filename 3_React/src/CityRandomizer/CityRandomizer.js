import React from "react";
import "./CityRandomizer.css";
import GetDataBtn from "./GetDataBtn/GetDataBtn";
import LastGeneratedPair from "./LastGeneratedPair/LastGeneratedPair";
import AllGeneratedPairs from "./AllGeneratedPairs/AllGeneratedPairs";
import {
  setCities,
  setAdjectives,
  setLastGeneratedPair,
  setGeneratedPairs,
  setMaxValueGeneratedPairs,
  setValueOfGeneratedPairs,
  setIsBtnEnable
} from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CityRandomizer extends React.PureComponent {
  componentDidMount() {
    console.log(this.props);
    this.getData();
  }

  getData = () => {
    fetch("https://gp-js-test.herokuapp.com/api")
      .then(response => response.json())
      .then(data => {
        this.props.setCities(data.cities);
        this.props.setAdjectives(data.adjectives);
      })
      .then(() => this.setMaxValueOfPairs());
  };

  setMaxValueOfPairs = () => {
    console.log(
      ((this.props.cities.length + this.props.adjectives.length) / 2).toFixed(0)
    );
    this.props.setMaxValueGeneratedPairs(
      ((this.props.cities.length + this.props.adjectives.length) / 2).toFixed(0)
    );
  };

  isCountOfPairsValid = () => {
    return (
      this.props.valueOfGeneratedPairs + 1 < this.props.maxValueGeneratedPairs
    );
  };

  generatePair = () => {
    let adjective = this.getRandomValue(this.props.adjectives);
    let city = this.getRandomValue(this.props.cities);
    this.appendNewPair(adjective, city);
  };

  getRandomValue = arr => {
    if (Array.isArray(arr)) {
      let randomItem = arr[Math.floor(Math.random() * arr.length)];
      let arrString = this.props.generatedPairs.join(" ");
      let regExpRandomItem = new RegExp(randomItem, "i");
      if (arrString.search(regExpRandomItem) > -1) {
        return this.getRandomValue(arr);
      } else {
        return randomItem[0].toUpperCase() + randomItem.slice(1);
      }
    } else {
      throw new Error("Bad argument for getRandomValue function");
    }
  };

  appendNewPair = (adjective, city) => {
    let newPair = `${adjective} ${city}`;
    let pairs = [...this.props.generatedPairs];
    pairs.push(newPair);
    this.props.setGeneratedPairs(pairs);
    this.props.setValueOfGeneratedPairs(this.props.valueOfGeneratedPairs + 1);
    this.props.setLastGeneratedPair(newPair);
    this.props.setIsBtnEnable(this.isCountOfPairsValid() ? true : false);
  };

  render() {
    return (
      <div className="city-randomizer">
        <GetDataBtn
          isBtnEnable={this.props.isBtnEnable}
          action={this.generatePair}
        />
        <LastGeneratedPair lastPair={this.props.lastGeneratedPair} />
        <p>
          {this.props.valueOfGeneratedPairs}/{this.props.maxValueGeneratedPairs}{" "}
          pairs
        </p>
        <AllGeneratedPairs generatedPairs={this.props.generatedPairs} />
      </div>
    );
  }
}
const putStateInProps = state => {
  return {
    adjectives: state.cityRandomizer.adjectives,
    cities: state.cityRandomizer.cities,
    lastGeneratedPair: state.cityRandomizer.lastGeneratedPair,
    generatedPairs: state.cityRandomizer.generatedPairs,
    maxValueGeneratedPairs: state.cityRandomizer.maxValueGeneratedPairs,
    valueOfGeneratedPairs: state.cityRandomizer.valueOfGeneratedPairs,
    isBtnEnable: state.cityRandomizer.isBtnEnable
  };
};

const putActionsInProps = dispatch => {
  return {
    setCities: bindActionCreators(setCities, dispatch),
    setAdjectives: bindActionCreators(setAdjectives, dispatch),
    setLastGeneratedPair: bindActionCreators(setLastGeneratedPair, dispatch),
    setGeneratedPairs: bindActionCreators(setGeneratedPairs, dispatch),
    setMaxValueGeneratedPairs: bindActionCreators(
      setMaxValueGeneratedPairs,
      dispatch
    ),
    setValueOfGeneratedPairs: bindActionCreators(
      setValueOfGeneratedPairs,
      dispatch
    ),
    setIsBtnEnable: bindActionCreators(setIsBtnEnable, dispatch)
  };
};

export default connect(
  putStateInProps,
  putActionsInProps
)(CityRandomizer);
