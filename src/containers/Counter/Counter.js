import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case 'inc':
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case 'dec':
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case 'add':
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case 'sub':
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        break;
    }
  };

  render() {
    // console.log(this.props.results);

    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label='Increment'
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label='Decrement'
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label='Add 5' clicked={this.props.onAddToCounter} />
        <CounterControl
          label='Subtract 5'
          clicked={this.props.onSubtractFromCounter}
        />

        <hr />
        <button onClick={this.props.onStoreResult}>Store Result</button>
        <ul>
          {this.props.results.map((storedResult, index) => {
            return (
              <li
                onClick={() => this.props.onDeleteResult(storedResult.id)}
                key={storedResult.id}>
                {storedResult.value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    results: state.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddToCounter: () =>
      dispatch({ type: actionTypes.ADD_TO_COUNTER, value: 5 }),
    onSubtractFromCounter: () =>
      dispatch({ type: actionTypes.SUBTRACT_FROM_COUNTER, value: 5 }),
    onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT }),
    onDeleteResult: (id) =>
      dispatch({ type: actionTypes.DELETE_RESULT, elementId: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
