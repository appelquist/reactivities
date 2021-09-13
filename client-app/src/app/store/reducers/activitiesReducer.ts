import agent from "../../api/agent";
import { ActivitiesState } from "../../models/ActivitiesState";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState : ActivitiesState = {
    activities: [],
    selectedActivity: undefined,
    loading: false,
    editMode: false,
}

const activitiesReducer = (state: ActivitiesState = initialState, action: Action )=> {
    switch (action.type) {
        case ActionType.FETCH_ACTIVITIES_PENDING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_ACTIVITIES_SUCCESS: 
            return {
                ...state,
                loading: false,
                activities: action.payload
            }
        case ActionType.FETCH_ACTIVITIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ActionType.SELECT_ACTIVITY:
            return {...state, selectedActivity: state.activities.find(a => a.id === action.payload)}
        case ActionType.CANCEL_SELECT_ACTIVITY:
            return {...state, selectedActivity: undefined}
        case ActionType.OPEN_EDIT_MODE:
            return {...state, editMode: true}
        case ActionType.CLOSE_EDIT_MODE:
            return {...state, editMode: false}
        default: {
            return state;
        }
    }
}

export default activitiesReducer;