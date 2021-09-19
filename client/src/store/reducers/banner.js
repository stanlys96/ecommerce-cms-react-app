const initialState = {
  banners: [],
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'BANNER/GETBANNERS':
      return { banners: payload };
    case 'BANNER/ADDBANNER':
      return { banners: [...state.banners, payload] };
    default:
      return state;
  }
}

export default reducer;