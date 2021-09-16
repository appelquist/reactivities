import { Activity } from "./activity";

export interface ActivitiesState {
    activities: Activity[];
    activity: Activity | undefined;
    fetching: boolean;
    submitting: boolean;
}