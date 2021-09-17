const initialState = {
  user: {}
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'USER/GETUSER':
      return { ...state.user };
    case 'USER/SETUSER':
      return { ...state, user: payload }
    default:
      return state;
  }
}