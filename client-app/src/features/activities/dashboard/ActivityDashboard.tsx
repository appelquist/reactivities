import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State } from '../../../app/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

function ActivityDashBoard() {

    const dispatch = useDispatch();
    const { fetchActivities } = bindActionCreators(actionCreators, dispatch);
    const { selectedActivity } = useSelector((state: State) => state.activities);
    const { editMode, fetching } = useSelector((state: State) => state.activities);

    useEffect(() => {
        fetchActivities();
    }, [])

    if (fetching) return <LoadingComponent content='Loading...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {selectedActivity && !editMode &&
                    <ActivityDetails
                    />}
                {editMode && (
                    <ActivityForm />
                )} */}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashBoard;