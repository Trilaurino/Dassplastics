import React from 'react';
import { makeStyles } from '@mui/styles';
import NavBar from './components/NavBar';
import Tablet from './components/Tablet';
import Leaders from './components/Leaders';

const useStyles = makeStyles(() => ({
    general: {
        backgroundColor: '#605E5E',
    }
}));

function Dass() {
    const classes = useStyles ();
    return (
        <div className = {classes.general}>
            <NavBar />
            <Tablet />
            <Leaders />
        </div>
    )
}

export default Dass;

