import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Style from 'style-it';
import { Typography } from "@material-ui/core";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: 'url("images/tech_background.jpg") no-repeat center center/cover',
  },
  jumbotron: {
    background: "rgba(255, 255, 255, .6)",
    padding: "20px",
    borderRadius: "20px",
    color: "#FFFFFF",
    width: '100%',
  },
  formGroup: {
    margin: "20px 150px 20px 150px",
  }
}));

const Login = () => {
  const classes = useStyles();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [test, setTest] = useState("");
  return Style.it(
    `
    #container {
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      height: 92vh;
      margin: 8vh 0 0 0;
      padding: 50px 200px 0;
    }
    #container:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: url("images/tech_background.jpg") no-repeat center center/cover;
      height: 100vh;
      z-index: -1;
    }
    `,
    <div id="container">
      <Jumbotron className={classes.jumbotron}>
        <h2 className="display-3">Login <FontAwesomeIcon icon={faSignInAlt} /></h2>
        <Form>
          <FormGroup className={classes.formGroup}>
            <Input onChange={(e) => { 
              setEmail(e.target.value);
            }} type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Input onChange={(e) => { 
              setPassword(e.target.value) 
            }} type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Button onClick={(e) => {
            e.preventDefault();
          }} color="primary">Submit</Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default Login;