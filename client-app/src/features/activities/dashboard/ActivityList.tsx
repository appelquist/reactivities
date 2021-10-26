import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Header, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { State } from '../../../app/store';
import ActivityListItem from './ActivityListItem';

const selectGroupedActivitiesByDate = createSelector(
    (state: State) => state.activities,
    (activities) => Object.entries(
        activities.activities.reduce((activities, activity) => {
            const date = activity.date;
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities;
        }, {} as { [key: string]: Activity[] })
    )
)

function ActivityList() {
    const groupedActivitiesByDate = useSelector(selectGroupedActivitiesByDate);

    return (
        <>
            {groupedActivitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
    );
}

export default ActivityList;