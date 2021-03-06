import { Activity } from '../../models/activity';
import { ActionType } from '../action-types';

interface SelectActivtyAction {
    type: ActionType.SELECT_ACTIVITY;
    payload: string;
}

interface CancelSelectActivityAction {
    type: ActionType.CANCEL_SELECT_ACTIVITY;
}

interface FetchActivityPendingAction {
    type: ActionType.FETCH_ACTIVITY_PENDING;
}

interface FetchActivitySuccessAction {
    type: ActionType.FETCH_ACTIVITY_SUCCESS;
    payload: Activity;
}

interface FetchActivityErrorAction {
    type: ActionType.FETCH_ACTIVITY_ERROR;
    payload: string;
}

interface FetchActivitiesPendingAction {
    type: ActionType.FETCH_ACTIVITIES_PENDING;
}

interface FetchActivitiesSuccessAction {
    type: ActionType.FETCH_ACTIVITIES_SUCCESS;
    payload: Activity[];
}

interface FetchActivitiesErrorAction {
    type: ActionType.FETCH_ACTIVITIES_ERROR;
    payload: string
}

interface CreateActivityPendingAction {
    type: ActionType.CREATE_ACTIVITY_PENDING;
}

interface CreateActivitySuccessAction {
    type: ActionType.CREATE_ACTIVITY_SUCCESS;
    payload: Activity;
}

interface CreateActivityErrorAction {
    type: ActionType.CREATE_ACTIVITY_ERROR;
    payload: string;
}

interface EditActivityPendingAction {
    type: ActionType.EDIT_ACTIVITY_PENDING;
}

interface EditActivitySuccessAction {
    type: ActionType.EDIT_ACTIVITY_SUCCESS;
    payload: Activity;
}

interface EditActivityErrorAction {
    type: ActionType.EDIT_ACTIVITY_ERROR;
    payload: string;
}

interface DeleteActivityPendingAction {
    type: ActionType.DELETE_ACTIVITY_PENDING;
}

interface DeleteActivitySuccessAction {
    type: ActionType.DELETE_ACTIVITY_SUCCESS;
    payload: string;
}

interface DeleteActivityErrorAction {
    type: ActionType.DELETE_ACTIVITY_ERROR;
    payload: string;
}


export type Action = SelectActivtyAction | CancelSelectActivityAction |
     FetchActivitiesSuccessAction | FetchActivitiesPendingAction |
    FetchActivitiesErrorAction | CreateActivityPendingAction | CreateActivitySuccessAction |
    CreateActivityErrorAction | EditActivityPendingAction | EditActivitySuccessAction | EditActivityErrorAction |
    DeleteActivityPendingAction | DeleteActivitySuccessAction | DeleteActivityErrorAction | FetchActivityPendingAction |
    FetchActivitySuccessAction | FetchActivityErrorAction;