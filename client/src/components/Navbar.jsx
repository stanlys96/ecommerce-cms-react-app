import React, { useEffect } from "react";
import Swal from 'sweetalert2';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faHome, faLaptopCode, faShoppingBag, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, setMessage } from '../store/action';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.close)
  }
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 1,
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
    marginLeft: '20px',
  },
  tag: {
    textDecoration: "none",
    color: "#ffffff"
  },
}));

const Navbar = () => {
  const classes = useStyles();
  let history = useHistory();
  const status = useSelector(state => state.user.status);
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);
  useEffect(() => {
    console.log(status, "<<<");
  }, [status]);
  return (
    <AppBar color="primary" className={classes.appBar}>
      <ul className={classes.unorderedList}>
        <li><FontAwesomeIcon icon={faLaptopCode} /> Techintos</li>
        <ul className={classes.secondUnorderedList}>
          {(status === false || status == "false") && <li className={classes.li}><Button onClick={() => { history.push('/') }} color="danger"><FontAwesomeIcon icon={faHome} /> Home</Button></li>}
          {(status === false || status == "false") && <li className={classes.li}><Button onClick={() => { history.push('/login') }} color="success"><FontAwesomeIcon icon={faSignInAlt} /> Login</Button></li>}
          {(status === true || status == "true") && <li className={classes.li}><Button onClick={() => { }} color="secondary"><FontAwesomeIcon icon={faAd} /> Banners</Button></li>}
          {(status === true || status == "true") && <li className={classes.li}><Button onClick={() => { history.push('/products') }} color="success"><FontAwesomeIcon icon={faShoppingBag} /> Products</Button></li>}
          {(status === true || status == "true") && <li className={classes.li}><Button onClick={() => {
            dispatch(setStatus(false));
            localStorage.setItem('userLoggedIn', false);
            dispatch(setMessage('Good bye'));
            Toast.fire({
              icon: 'success',
              title: `Good Bye!`
            });
            history.push('/');
          }} color="danger"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Button></li>}
        </ul>
      </ul>
    </AppBar>
  );
}

export default Navbar;