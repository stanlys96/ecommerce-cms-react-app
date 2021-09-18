import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Style from 'style-it';
import { Typography } from "@material-ui/core";
import { Jumbotron, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: 'url("images/tech_background.jpg") no-repeat center center/cover',
  },
  jumbotron: {
    background: "rgba(51, 170, 51, .6)",
    padding: "20px",
    borderRadius: "20px",
    color: "#FFFFFF",
    width: '100%',
  }
}));

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
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
        <h2 className="display-3">Welcome To Techintos! <FontAwesomeIcon icon={faLaptopCode} /></h2>
        <p className="lead">We sell high quality tech products!</p>
        <hr className="my-2" />
        <p>Feel free to ask us any questions!</p>
        <Button color="primary" onClick={() => { history.push("/login") }}><FontAwesomeIcon icon={faSignInAlt} /> Login</Button>
      </Jumbotron>
    </div>
  );
}

export default Home;