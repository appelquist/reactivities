import { Activity } from "./activity";

export interface ActivitiesState {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    loading: boolean;
    editMode: boolean;
}