import React, { useEffect, useReducer } from "react";

const initialState = { count: 0, step: 1 };
const stepReducer = (state, action) => {
  const { step, count } = state;
  switch (action.type) {
    case "TICK":
      return { ...state, count: count + step };
    case "SET_STEP":
      return { ...state, step: action.step };
    default:
      throw new Error();
  }
};

const AutoCounter = () => {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <>
      <div>{count}</div>
      <input
        value={step}
        onChange={(e) =>
          dispatch({ type: "SET_STEP", step: Number(e.target.value) })
        }
      />
    </>
  );
};

export default AutoCounter;
