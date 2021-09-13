import { combineReducers } from "redux";
import activitiesReducer from "./activitiesReducer";

const reducers = combineReducers({
    activities: activitiesReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>