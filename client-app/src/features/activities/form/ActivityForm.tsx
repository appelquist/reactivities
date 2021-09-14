import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { actionCreators, State } from '../../../app/store';

function ActivityForm() {

    const dispatch = useDispatch();
    const { closeEditMode, createActivity, updateActivity } = bindActionCreators(actionCreators, dispatch); 
    const { selectedActivity, submitting } = useSelector((state: State) => state.activities);

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        if (activity.id === '') {
            createActivity(activity);
        } else {
            updateActivity(activity);
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button onClick={closeEditMode} floated='right' type='button' content='Cancel' onChange={handleInputChange} />
            </Form>
        </Segment>
    );
}

export default ActivityForm;