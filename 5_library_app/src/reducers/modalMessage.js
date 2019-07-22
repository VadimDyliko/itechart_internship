const initialState = {
    isShow: false,
    modalTitle: "Title",
    modalText: "Text"
  }

  const modalMessage = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MODAL':
        return Object.assign({}, state, {
          modalMessage: action.data
        });
      default:
        return state;
    }
  }

export default modalMessage;
