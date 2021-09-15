import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State, } from '../../../app/store';

interface Props {
    id: string;
}

function ActivityDetails({ id }: Props ) {
    const dispatch = useDispatch();
    const { cancelSelectActivity, openEditMode, fetchActivityById, selectActivity} = bindActionCreators(actionCreators, dispatch);
    const { selectedActivity: activity } = useSelector((state: State) => state.activities);

    useEffect(() => {
        fetchActivityById(id);
        selectActivity(id);
    }, [])

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
                    <Button as={Link} to='/activities' onClick={cancelSelectActivity} basic color='grey' content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;