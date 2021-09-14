import React from 'react'
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import { State } from '../../../app/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

function ActivityDashBoard() {

    const { selectedActivity } = useSelector((state: State) => state.activities);
    const { editMode } = useSelector((state: State) => state.activities);

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                    />}
                {editMode && (
                    <ActivityForm />
                )}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashBoard;