import { ActivitiesState } from "../../models/ActivitiesState";
import { Activity } from "../../models/activity";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState: ActivitiesState = {
    activities: [],
    selectedActivity: undefined,
    fetching: true,
    submitting: false,
    editMode: false,
}

const activitiesReducer = (state: ActivitiesState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.FETCH_ACTIVITY_PENDING:
            return { ...state, fetching: true }
        case ActionType.FETCH_ACTIVITY_SUCCESS:
            return { ...state, activities: [...state.activities, action.payload], fetching: false }
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
                selectedActivity: state.activities.find(a => a.id === action.payload),
                editMode: false
            }
        case ActionType.CANCEL_SELECT_ACTIVITY:
            return { ...state, selectedActivity: undefined }
        case ActionType.CREATE_ACTIVITY_PENDING:
            return { ...state, submitting: true }
        case ActionType.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities, action.payload].sort((a: Activity, b: Activity) => {
                    return +new Date(b.date) - +new Date(a.date)
                }),
                submitting: false,
                selectedActivity: action.payload,
                editMode: false
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
                editMode: false,
                selectedActivity: action.payload,
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
                selectedActivity: state.selectedActivity?.id === action.payload ? undefined : state.selectedActivity
            }
        case ActionType.DELETE_ACTIVITY_ERROR:
            return { ...state, submitting: false }
        case ActionType.OPEN_EDIT_MODE:
            return { ...state, editMode: true }
        case ActionType.CLOSE_EDIT_MODE:
            return { ...state, editMode: false }
        default: {
            return state;
        }
    }
}

export default activitiesReducer;