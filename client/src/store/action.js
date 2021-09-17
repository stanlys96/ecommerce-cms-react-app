import axios from 'axios';

export function setUser(payload) {
  return { type: 'USER/SETUSER', payload }
}

export function getUser() {
  return { type: 'USER/GETUSER' }
}

export function login(email, passwoord) {
  return async (dispatch) => {
    try {
      const url = 'https://ecommerce-cms-react.herokuapp.com/users/login';
      const response = await axios({
        url,
        method: 'POST',
        data: {
          email,
          password
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}