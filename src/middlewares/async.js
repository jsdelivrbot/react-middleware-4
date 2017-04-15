export default function({ dispatch }) {
  return next => action => {
    console.log(action);

    //if the action does not have a payload or the opoyaload does
    //// not have a .then property, tyhen we dont care about it
    if (!action.payload || !action.payload.then) {
      //sends it to the next middleware/reducer
      return next(action);
    }

    //make sure the actions promise resolves
    action.payload
      .then(function(response) {
        const newAction = { ...action, payload: response };

        //sends the action through all middlewares and reducer again
        dispatch(newAction);
      });
  }
}