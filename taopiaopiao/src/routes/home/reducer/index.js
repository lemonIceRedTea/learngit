const seats = (state = [], action) => {
  switch(action.type) {
    case "ADD_SEAT":
      return [
        ...state,
        action.seat
      ];
    case "REMOVE_SEAT":
      return state.filter(seat => seat.id !== action.id);
    case "CLEAR_SEAT":
      return [];
    default:
      return state;
  }
};

export default seats;
