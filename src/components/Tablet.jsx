import React from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import TabletImg from '../img/tabletcompleta.png';

const useStyles = makeStyles(() => ({
    tablet: {
        width: '95em',
        height: 'auto',
        marginTop: '5em'
    }
}));

function Tablet() {
    const classes = useStyles ();
    return (
        <Container maxWidth="xl">
            <div>
            <img src={TabletImg} alt="tablet" className={classes.tablet}/>
            </div>
        </Container>
    )
};

export default Tablet;
