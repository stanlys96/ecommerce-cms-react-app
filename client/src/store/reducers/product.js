const initialState = {
  products: [],
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'PRODUCT/GETPRODUCTS':
      return { products: payload };
    case 'PRODUCT/ADDPRODUCT':
      return { products: [...state.products, payload] };
    default:
      return state;
  }
}

export default reducer;