import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State } from '../../../app/store';
import ActivityList from './ActivityList';

function ActivityDashBoard() {

    const dispatch = useDispatch();
    const { fetchActivities } = bindActionCreators(actionCreators, dispatch);
    const { fetching, activities } = useSelector((state: State) => state.activities);

    useEffect(() => {
        if (activities.length === 0) fetchActivities();
    }, [])

    if (fetching) return <LoadingComponent content='Loading...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashBoard;