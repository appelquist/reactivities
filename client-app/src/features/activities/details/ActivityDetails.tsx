import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State } from '../../../app/store';

function ActivityDetails() {
    const dispatch = useDispatch();
    const { cancelSelectActivity, openEditMode } = bindActionCreators(actionCreators, dispatch);
    const { selectedActivity: activity } = useSelector((state: State) => state.activities);

    if (!activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openEditMode(activity.id)} basic color='blue' content="Edit" />
                    <Button onClick={cancelSelectActivity} basic color='grey' content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;