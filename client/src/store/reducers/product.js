const initialState = {
  products: [],
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'PRODUCT/GETPRODUCTS':
      return { ...state.products, products: payload };
    case 'PRODUCT/ADDPRODUCT':
      return { ...state, products: [...state.products, payload] };
    default:
      return state;
  }
}

export default reducer;