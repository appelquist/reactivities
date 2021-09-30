import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { actionCreators, State } from '../../../app/store';

function ActivityForm() {
    const dispatch = useDispatch();
    const { createActivity, updateActivity } = bindActionCreators(actionCreators, dispatch); 
    const { activity, submitting } = useSelector((state: State) => state.activities);

    const initialState = activity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [formActivity, setFormActivity] = useState(initialState);

    function handleSubmit() {
        if (formActivity.id === '') {
            createActivity(formActivity);
        } else {
            updateActivity(formActivity);
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormActivity({...formActivity, [name]: value});
    }

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
                <Button floated='right' type='button' content='Cancel' onChange={handleInputChange} />
            </Form>
        </Segment>
    );
}

export default ActivityForm;