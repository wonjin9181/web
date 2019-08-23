import React, { Component } from "react";
import Login from "./components/login/login";
import CreateUser from "./components/create-user/create_user";
import MainStats from "./components/main-stats/main_stats";
import Fight from "./components/fight/fight";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import API from "./utils/API"



class App extends Component {

  stall = async function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      },100)
    })
  }

  componentDidMount = async function() {
    await this.stall();
    console.log('Component did mount')
  }

  render() {
    return (
      <Router>
      
        <div>
          <Route exact path="/" component={() => <Login
          />} />

          <Route exact path="/createuser" component={CreateUser} />


          <Route exact path="/fight" component={() => <Fight
          />} />


          <Route exact path="/main" component={(props) => <MainStats {...props}
          />} />


        </div>
      </Router>

    )
  }
}

export default App;
