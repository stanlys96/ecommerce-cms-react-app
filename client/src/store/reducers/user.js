const initialState = {
  user: {},
  status: '',
  message: '',
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'USER/GETUSER':
      return { ...state.user };
    case 'USER/SETUSER':
      return { ...state, user: payload }
    case 'USER/SETSTATUS':
      return { ...state, status: payload }
    case 'USER/SETMESSAGE':
      return { ...state, message: payload }
    default:
      return state;
  }
}

export default reducer;