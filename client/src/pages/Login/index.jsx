import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { login } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Style from 'style-it';
import { Typography } from "@material-ui/core";
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faKeyboard, faLaptopCode, faMousePointer, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: 'url("images/tech_background.jpg") no-repeat center center/cover',
  },
  jumbotron: {
    padding: "20px",
    borderRadius: "20px",
    color: "#FFFFFF",
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '400px',
  },
  formGroup: {
    width: '100%',
    margin: '20px 0 0 0',
  },
  buttonLogin: {
    width: '100%',
    margin: '20px 0 0 0',
  }
}));

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user.user);
  const status = useSelector(state => state.user.status);
  const message = useSelector(state => state.user.message);
  let [loading, setLoading] = useState(false);
  const classes = useStyles();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [test, setTest] = useState("");
  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(async () => {
    console.log(message);
    if (message == "Success") {
      setLoading(false);
      await localStorage.setItem('userLoggedIn', true);
      history.push('/products');
    }
  }, [message]);
  return Style.it(
    `
    #container {
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      height: 100vh;
      padding: 8vh 200px 0;
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
        <Form className={classes.form}>
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
          <Button className={classes.buttonLogin} onClick={(e) => {
            e.preventDefault();
            if (email == "" || password == "") {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'All fields must be filled!',
              })
            } else if (!re.test(String(email).toLowerCase())) {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Invalid email format!',
              })
            } else if (password.length < 6) {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Password minimum 6 characters!',
              });
            } else {
              setLoading(true);
              dispatch(login(email, password, setLoading));
            }
          }} color="primary">{loading ? "" : <FontAwesomeIcon icon={faMousePointer} />}{loading ? <Loader
            type="Puff"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={10000000} //3 secs
          /> : " Submit"}</Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default Login;