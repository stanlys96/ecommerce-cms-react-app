import axios from 'axios';

export function setUser(payload) {
  return { type: 'USER/SETUSER', payload }
}

export function setStatus(payload) {
  return { type: 'USER/SETSTATUS', payload }
}

export function setMessage(payload) {
  return { type: 'USER/SETMESSAGE', payload }
}

export function getUser() {
  return { type: 'USER/GETUSER' }
}

export function login(email, password) {
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
      if (response.status == 200) {
        const user = {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email
        }
        dispatch(setUser(user));
        dispatch(setMessage(response.data.message));
        dispatch(setStatus('logged_in'));
      } else {
        console.log(response);
        dispatch(setMessage(response.data.message));
      }
    } catch (err) {
      console.log(err);
    }
  }
}