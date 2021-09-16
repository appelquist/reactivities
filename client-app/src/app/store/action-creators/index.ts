import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions/index";
import { Activity } from "../../models/activity";
import agent from "../../api/agent";
import { v4 as uuid } from 'uuid';
import { State } from "../../store";

export const selectActivity = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SELECT_ACTIVITY,
            payload: id
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

export const fetchActivityById = (id: string) => {
    return async (dispatch: Dispatch<Action>, getState: () => State) => {
        let activity = getState().activities.activities.find((a: Activity) => a.id === id);
        if (activity) {
            dispatch({
                type: ActionType.SELECT_ACTIVITY,
                payload: id
            });
        } else {
            dispatch({
                type: ActionType.FETCH_ACTIVITY_PENDING
            });
            try {
                activity = await agent.Activities.details(id);
                activity.date = activity.date.split('T')[0];
                dispatch({
                    type: ActionType.FETCH_ACTIVITY_SUCCESS,
                    payload: activity
                });
            } catch (error) {
                dispatch({
                    type: ActionType.FETCH_ACTIVITY_ERROR,
                    payload: "Error"
                });
            }
        }
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
            const sortedActivities = activities.sort((a: Activity, b: Activity) => {
                return +new Date(b.date) - +new Date(a.date)
            })
            dispatch({
                type: ActionType.FETCH_ACTIVITIES_SUCCESS,
                payload: sortedActivities
            });
        } catch (error) {
            dispatch({
                type: ActionType.FETCH_ACTIVITIES_ERROR,
                payload: "Error"
            });
        }

    }
}

export const createActivity = (activity: Activity) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE_ACTIVITY_PENDING,
        });
        activity.id = uuid();
        try {
            await agent.Activities.create(activity)
            dispatch({
                type: ActionType.CREATE_ACTIVITY_SUCCESS,
                payload: activity
            });
        } catch (error) {
            dispatch({
                type: ActionType.CREATE_ACTIVITY_ERROR,
                payload: "Error"
            });
        }
    }
}

export const updateActivity = (activity: Activity) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.EDIT_ACTIVITY_PENDING,
        });
        try {
            await agent.Activities.update(activity);
            dispatch({
                type: ActionType.EDIT_ACTIVITY_SUCCESS,
                payload: activity
            });
        } catch (error) {
            dispatch({
                type: ActionType.EDIT_ACTIVITY_ERROR,
                payload: "Error"
            });
        }
    }
}

export const deleteActivity = (id: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_ACTIVITY_PENDING,
        });
        try {
            await agent.Activities.delete(id);
            dispatch({
                type: ActionType.DELETE_ACTIVITY_SUCCESS,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: ActionType.DELETE_ACTIVITY_ERROR,
                payload: "Error"
            });
        }
    }
}
