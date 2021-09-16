import { ActivitiesState } from "../../models/ActivitiesState";
import { Activity } from "../../models/activity";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState: ActivitiesState = {
    activities: [],
    activity: undefined,
    fetching: false,
    submitting: false,
}

const activitiesReducer = (state: ActivitiesState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.FETCH_ACTIVITY_PENDING:
            return { ...state, fetching: true }
        case ActionType.FETCH_ACTIVITY_SUCCESS:
            return { ...state, activities: [...state.activities, action.payload], fetching: false, activity: action.payload }
        case ActionType.FETCH_ACTIVITY_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case ActionType.FETCH_ACTIVITIES_PENDING:
            return { ...state, fetching: true }
        case ActionType.FETCH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                fetching: false,
                activities: action.payload
            }
        case ActionType.FETCH_ACTIVITIES_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case ActionType.SELECT_ACTIVITY:
            return {
                ...state,
                activity: state.activities.find(a => a.id === action.payload),
            }
        case ActionType.CANCEL_SELECT_ACTIVITY:
            return { ...state, activity: undefined }
        case ActionType.CREATE_ACTIVITY_PENDING:
            return { ...state, submitting: true }
        case ActionType.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities, action.payload].sort((a: Activity, b: Activity) => {
                    return +new Date(b.date) - +new Date(a.date)
                }),
                submitting: false,
                activity: action.payload,
            }
        case ActionType.CREATE_ACTIVITY_ERROR:
            return { ...state, submitting: false }
        case ActionType.EDIT_ACTIVITY_PENDING:
            return { ...state, submitting: true }
        case ActionType.EDIT_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities.filter(a => a.id !== action.payload.id), action.payload].sort((a: Activity, b: Activity) => {
                    return +new Date(b.date) - +new Date(a.date)
                }),
                submitting: false,
                activity: action.payload,
            }
        case ActionType.EDIT_ACTIVITY_ERROR:
            return { ...state, submitting: false }
        case ActionType.DELETE_ACTIVITY_PENDING:
            return { ...state, submitting: true }
        case ActionType.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: state.activities.filter(a => a.id !== action.payload),
                submitting: false,
            }
        case ActionType.DELETE_ACTIVITY_ERROR:
            return { ...state, submitting: false }
        default: {
            return state;
        }
    }
}

export default activitiesReducer;