import { Activity } from "./activity";

export interface ActivitiesState {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    fetching: boolean;
    editMode: boolean;
    submitting: boolean;
}