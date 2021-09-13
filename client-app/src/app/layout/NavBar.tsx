import React from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Container, Menu } from 'semantic-ui-react'
import { actionCreators } from '../store';

function NavBar() {

  const dispatch = useDispatch();
  const { openEditMode } = bindActionCreators(actionCreators, dispatch);

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Reactivites
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={() => openEditMode()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar;