import React, { SyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { actionCreators, State } from '../../../app/store';

interface Props {
    activity: Activity;
}

export default function ActivityListItem({activity}:Props) {
    const [target, setTarget] = useState('');

    const dispatch = useDispatch();
    const { deleteActivity } = bindActionCreators(actionCreators, dispatch);
    const { submitting } = useSelector((state: State) => state.activities);

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' color='blue' content='View' />
                    <Button
                        name={activity.id}
                        loading={submitting && target === activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        floated='right'
                        color='red'
                        content='Delete' />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}