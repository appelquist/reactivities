import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions/index";
import { Activity } from "../../models/activity";
import agent from "../../api/agent";

export const getAllActivities = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_ALL_ACTIVITIES
        });
    }
}

export const selectActivity = (id?: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SELECT_ACTIVITY,
            payload: id
        });
    }
}

export const cancelSelectActivity = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CANCEL_SELECT_ACTIVITY
        });
    }
}

export const openEditMode = (id?: string) => {
    return (dispatch: Dispatch<Action>) => {
        if (id) {
            dispatch({
                type: ActionType.SELECT_ACTIVITY,
                payload: id
            })
        } else
        dispatch({
            type: ActionType.CANCEL_SELECT_ACTIVITY,
        });
        dispatch({
            type: ActionType.OPEN_EDIT_MODE,
        })
    }
}

export const closeEditMode = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CLOSE_EDIT_MODE
        });
    }
}

export const fetchActivitiesPending = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_ACTIVITIES_PENDING
        })
    }
}

export const fetchActivitiesSuccess = (activities: Activity[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_ACTIVITIES_SUCCESS,
            payload: activities
        })
    }
}

export const fetchActivitiesError = (error: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_ACTIVITIES_ERROR,
            payload: error
        })
    }
}

export const fetchActivities = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_ACTIVITIES_PENDING
        });
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
            });
            dispatch({
                type: ActionType.FETCH_ACTIVITIES_SUCCESS,
                payload: activities
            });
        } catch(error) {
            dispatch({
                type: ActionType.FETCH_ACTIVITIES_ERROR,
                payload: "Error"
            });
        }

    }
}
