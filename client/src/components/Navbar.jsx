import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLaptopCode, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8vh',
    display: 'flex',
    justifyContent: 'center',
  },
  unorderedList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: "15px 150px 0",
  },
  secondUnorderedList: {
    listStyle: 'none',
  },
  li: {
    display: 'inline-block',
    marginRight: '20px',
  },
  tag: {
    textDecoration: "none",
    color: "#ffffff"
  },
}));

const Navbar = () => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <AppBar color="primary" position="fixed" className={classes.appBar}>
      <ul className={classes.unorderedList}>
        <li><FontAwesomeIcon icon={faLaptopCode} /> Techintos</li>
        <ul className={classes.secondUnorderedList}>
          <li className={classes.li}><Button onClick={() => {history.push('/')}} color="danger"><FontAwesomeIcon icon={faHome} /> Home</Button></li>
          <li className={classes.li}><Button onClick={() => {history.push('/login')}} color="success"><FontAwesomeIcon icon={faSignInAlt} /> Login</Button></li>
        </ul>
      </ul>
    </AppBar>
  );
}

export default Navbar;