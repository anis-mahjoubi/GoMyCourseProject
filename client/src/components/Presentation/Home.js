import React, { Component } from "react";
// import "./public/css/business-casual.min.css"
import Navbar from './Navbar'
import * as Constants from './Data'
import MainSection from './MainSection'
import Footer from './Footer'
import './Home.css'

export class Home extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar menuData={Constants.menuitems} /> */}
        <MainSection presentationData={Constants.presentationData} coloredCardData={Constants.coloredCardData} statsData={Constants.statsData} officeData={Constants.officeData} />
        <Footer />
        
      </div>
    );
  }
}

export default Home;
