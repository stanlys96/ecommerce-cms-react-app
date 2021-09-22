import axios from 'axios';
import Swal from 'sweetalert2';
const globalUrl = 'https://ecommerce-cms-react.herokuapp.com';

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

export function getBanners(payload) {
  return { type: 'BANNER/GETBANNERS', payload };
}

export function addBanner(payload) {
  return { type: 'BANNER/ADDBANNER', payload };
}

export function login(email, password, setLoading) {
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
        Toast.fire({
          icon: 'success',
          title: `Successfully logged in as ${email}!`
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: response.data.message,
        });
        setLoading(false);
        dispatch(setMessage(response.data.message));
      }
    } catch (err) {
      setLoading(false);
      if (err.message == "Request failed with status code 404") {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Email or password is incorrect!',
        });
        dispatch(setMessage(err.message));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err.message,
        });
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
          image_url: imageUrl,
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
          product_id: id,
          image_url: imageUrl,
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

export function deletingProduct(id) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/products/deleteProduct`;
      const response = await axios({
        url,
        method: 'DELETE',
        data: {
          product_id: id,
        }
      });
      dispatch(gettingProducts());
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}

export function gettingBanners() {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/banners/getAll`;
      const response = await axios({
        url,
        method: 'GET',
      });
      dispatch(getBanners(response.data));
    } catch (err) {
      console.log(err);
    }
  }
}

export function addingBanner(imageUrl, name, status) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/banners/addBanner`;
      const response = await axios({
        url,
        method: 'POST',
        data: {
          image_url: imageUrl,
          name,
          status,
        }
      });
      dispatch(addBanner(response.data));
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}

export function updatingBanner(id, imageUrl, name, status) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/banners/updateBanner`;
      const response = await axios({
        url,
        method: 'PUT',
        data: {
          banner_id: id,
          image_url: imageUrl,
          name,
          status,
        }
      });
      dispatch(gettingBanners());
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}

export function deletingBanner(id) {
  return async (dispatch) => {
    try {
      const url = `${globalUrl}/banners/deleteBanner`;
      const response = await axios({
        url,
        method: 'DELETE',
        data: {
          banner_id: id,
        }
      });
      dispatch(gettingBanners());
    } catch (err) {
      console.log(err, "<<< error");
    }
  }
}