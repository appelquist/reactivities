import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State, } from '../../../app/store';

function ActivityDetails() {
    const dispatch = useDispatch();
    const { fetchActivityById } = bindActionCreators(actionCreators, dispatch);
    const { activity, fetching } = useSelector((state: State) => state.activities);
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) fetchActivityById(id);
    }, [id])

    if (fetching || !activity) return <LoadingComponent />;

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
                    <Button basic color='blue' content="Edit" />
                    <Button as={Link} to='/activities' basic color='grey' content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;