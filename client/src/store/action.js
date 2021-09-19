import axios from 'axios';
const globalUrl = 'https://ecommerce-cms-react.herokuapp.com';

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

export function getStatus() {
  return { type: 'USER/GETSTATUS' };
}

export function getProducts(payload) {
  return { type: 'PRODUCT/GETPRODUCTS', payload };
}

export function addProduct(payload) {
  return { type: 'PRODUCT/ADDPRODUCT', payload };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/users/login`;
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
        dispatch(setStatus(true));
      } else {
        console.log(response, "<<<<");
        dispatch(setMessage(response.data.message));
      }
    } catch (err) {
      if (err.message == "Request failed with status code 404") {
        dispatch(setMessage(err.message));
      }
    }
  }
}

export function gettingProducts() {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/products/getAll`;
      const response = await axios({
        url,
        method: 'GET',
      });
      dispatch(getProducts(response.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export function addingProduct(imageUrl, name, category, price, stock) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/products/addProduct`;
      const response = await axios({
        url,
        method: 'POST',
        data: {
          imageUrl,
          name,
          category,
          price,
          stock,
        }
      });
      console.log(response, "<<<");
      dispatch(addProduct(response.data));
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}

export function updatingProduct(id, imageUrl, name, category, price, stock) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/products/updateProduct`;
      const response = await axios({
        url,
        method: 'PUT',
        data: {
          id,
          imageUrl,
          name,
          category,
          price,
          stock,
        }
      });
      console.log(response.data, "<<< update");
      dispatch(gettingProducts());
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}