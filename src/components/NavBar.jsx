import React from 'react';
import { makeStyles } from '@mui/styles';
import { ReactComponent as Logo } from '../img/logo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import spanish from '../img/espana.png';


const useStyles = makeStyles(() => ({
    navBar: {
        backgroundColor: '#605E5E',
        display: 'grid',
        gridTemplateColumns: '30% 15% 40% 5%',
        alignItems: 'center',
        justifyItems: 'center',
    },

    logo: {
        width: '5em',
        height: 'auto'
    },

    tabs:{
        display: 'grid',
        gridTemplateColumns: '33% 33% 33%',
    },

    spanish: {
        width: '4em',
        height: 'auto'
    }

}))

function NavBar() {
    const classes = useStyles();
    return (
        <div className={classes.navBar}>
            <Logo/>
            <SearchBar />
            <Menu />
            <Idiomas />
        </div>
    )
};

function SearchBar() {
    const classes = useStyles();
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                noValidate
                autoComplete="off"
            />
            <div>
                <TextField
                    id="outlined-size-small"
                    defaultValue="Buscador"
                    size="small"
                />
            </div>
        </div>
    )
};

function Menu() {
    const classes = useStyles();
    return(
        <div className={classes.tabs}>
            <a href="">PRODUCTOS</a>
            <a href="">¿QUIÉNES SOMOS?</a>
            <a href="">CONTACTO</a>
        </div>
    )
};

function Idiomas() {
    const classes = useStyles();
    return(
        <img src={spanish} alt="spanish" className={classes.spanish} />
    )
}

export default NavBar;
