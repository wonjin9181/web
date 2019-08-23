import React, { Component } from "react";
import { Button, Form, Row, Col, Container, Image } from "react-bootstrap";
import "./create_user.css";
import API from "../../utils/API";
import { Link, Redirect } from 'react-router-dom';
import backgroundImages from '../main-stats/backgroundImages';

class CreateUser extends Component {
  state = {
    username: "",
    house: "waterfall",
    email: "",
    password: "",
    characterImage: "",
    madeUser: false,
    bgImage: backgroundImages[0],
    music: false
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0 && this.state.house !== "waterfall" && this.state.characterImage > 0;
  }

  handleChange = event => {

    let selected = event.target.name.split("-"); // 'characterImage-1' > ['characterImage','1']
    let [characterImage] = selected; // storing index 0 in variable 'characterImage'
    let [imgId] = selected.reverse(); // reverse array and THEN store index 0 in variable imgId (which when reversed is the #!)

    if (characterImage === "characterImage") {
      this.setState({
        characterImage: parseInt(imgId)
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      }, function () {

        let image = backgroundImages.find(object => {
          return object.name === this.state.house;
        })
        this.setState({ bgImage: image })
      });
    }


  }


  handleSubmit = event => {
    let self = this;
    event.preventDefault();

    API.createUser(this.state).then(function (result) {
      if (!result.data) {
        alert("Email already exists!");
      } else {
        self.setState({
          madeUser: true
        }, function () {
          API.postHouse(this.state).then(function (result) {
          });
        });
      }
    });



  };

  render() {
    if (this.state.madeUser === true) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ height: "100vh", backgroundSize: "cover", backgroundImage: `url("${this.state.bgImage.src}")` }}>

        <Container>
          <h1 id="centerText">Wizard Game</h1>
          <aside id="createuser">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    placeholder="Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  House
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    inline
                    type="radio"
                    value="Fire"
                    onClick={this.handleChange}
                    label="Fire"
                    name="house"
                    id="formHorizontalRadios1"
                  />

                  <Form.Check
                    inline
                    type="radio"
                    value="Water"
                    onClick={this.handleChange}
                    label="Water"
                    name="house"
                    id="formHorizontalRadios2"
                  />

                  <Form.Check
                    inline
                    type="radio"
                    value="Earth"
                    onClick={this.handleChange}
                    label="Earth"
                    name="house"
                    id="formHorizontalRadios3"
                  />

                  <Form.Check
                    inline
                    type="radio"
                    value="Air"
                    onClick={this.handleChange}
                    label="Air"
                    name="house"
                    id="formHorizontalRadios4"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={1}>
                  Avatar
                </Form.Label>
                <Col>
                  <Image
                    type="image"
                    name="characterImage-1"
                    value="1"
                    onClick={this.handleChange}
                    src="images/rincewind.png"
                    thumbnail
                  />
                </Col>
                <Col>
                  <Image
                    name="characterImage-2"
                    onClick={this.handleChange}
                    src="images/blackwizard.png"
                    thumbnail
                  />
                </Col>
                <Col>
                  <Image
                    type="image"
                    name="characterImage-3"
                    onClick={this.handleChange}
                    src="images/killer.png"
                    thumbnail
                  />
                </Col>
                <Col>
                  <Image
                    type="image"
                    name="characterImage-4"
                    onClick={this.handleChange}
                    src="images/spritey.png"
                    thumbnail
                  />
                </Col>
              </Form.Group>

              <Button
                id="createUserBtn"
                variant="primary"
                type="submit"

                disabled={!this.validateForm()}>

                Create account </Button>
              <Link to="/">
                <Button className="btn">
                  Login
                </Button>
              </Link>

            </Form>
          </aside>
        </Container>
      </div>
    );
  }
}

export default CreateUser;
