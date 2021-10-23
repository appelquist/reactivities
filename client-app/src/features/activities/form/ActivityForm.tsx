import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { actionCreators, State } from '../../../app/store';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

function ActivityForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { createActivity, updateActivity, fetchActivityById } = bindActionCreators(actionCreators, dispatch); 
    const { activity, submitting, fetching } = useSelector((state: State) => state.activities);
    const {id} = useParams<{id: string}>();

    const [formActivity, setFormActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        console.log(id);
        if (id) {
            fetchActivityById(id);
            setFormActivity(activity!);
        }
    }, [id]);

    async function handleSubmit() {
        if (formActivity.id.length === 0) {
            let newActivity = {
                ...formActivity,
                id: uuid(),
            }
            await createActivity(newActivity);
            history.push(`/activities/${newActivity.id}`);

        } else {
            await updateActivity(formActivity);
            history.push(`/activities/${formActivity.id}`);
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormActivity({...formActivity, [name]: value});
    }

    if (fetching) return <LoadingComponent content='Loading activity...' />;

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' value={formActivity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={formActivity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={formActivity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={formActivity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={formActivity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={formActivity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
}

export default ActivityForm;