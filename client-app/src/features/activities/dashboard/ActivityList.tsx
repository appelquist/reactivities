import React from 'react'
import { useSelector } from 'react-redux';
import { Item, Segment } from 'semantic-ui-react';
import { State } from '../../../app/store';
import ActivityListItem from './ActivityListItem';

function ActivityList() {
    const { activities } = useSelector((state: State) => state.activities);

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    );
}

export default ActivityList;