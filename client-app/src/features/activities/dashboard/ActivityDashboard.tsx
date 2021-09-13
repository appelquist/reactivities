import React from 'react'
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import { State } from '../../../app/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    submitting: boolean;
}

function ActivityDashBoard({ submitting }: Props) {

    const { selectedActivity } = useSelector((state: State) => state.activities);
    const { activities, editMode } = useSelector((state: State) => state.activities);

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                    />}
                {editMode && (
                    <ActivityForm 
                        submitting={submitting}
                        />
                )}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashBoard;