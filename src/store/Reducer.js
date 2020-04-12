import * as actionTypes from './Actions';

const initialState = {
  counter: 0,
  results: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    case actionTypes.ADD_TO_COUNTER:
      return {
        ...state,
        counter: state.counter + action.value,
      };

    case actionTypes.SUBTRACT_FROM_COUNTER:
      return {
        ...state,
        counter: state.counter - action.value,
      };

    case actionTypes.STORE_RESULT:
      return {
        ...state,
        // push method on array is not immutable hence we used concat
        results: state.results.concat({ id: new Date(), value: state.counter }),
      };

    case 'DELETE_RESULT':
      // Use filter method to immutably delete element from array
      const updatedResult = state.results.filter(
        (result) => result.id !== action.elementId
      );
      return {
        ...state,
        results: updatedResult,
      };
    default:
      return state;
  }
};

export default Reducer;
