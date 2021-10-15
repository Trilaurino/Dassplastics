import React from 'react'
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenWork from '../img/menWork.png';


const useStyles = makeStyles (() => ({
    leaders:{
        display: 'grid',
       
        
    },

    menWork: {
        width: '50em',
        height: 'auto'
    },

    orangeBlock: {
        width: '45em',
        height: '15em',
        backgroundColor: '#FBB03B',
        borderRadius: '100px 0px 0px 100px',
        display: 'grid',
        justifyItems: 'center',
        alignItems:'center',
    },

    texto: {
        color: '#FFFFFF',
        width: '40em',
    },

}));

function Leaders() {
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
        <div className={classes.leaders} >
            <div>
            <img src={MenWork} alt='Hombres Trabajando' className={classes.menWork} />
            </div>
            <div>
                <div className = {classes.orangeBlock}>
                    <div className = {classes.texto}>
                        <Text />
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

function Text() {
    const classes = useStyles();
    return (
        <div>
                    <h2>LÍDERES EN INYECCIÓN</h2>
                    <p>
                        Líderes en desarrollo y fabricación de
                        contenedores plásticos con mas de 26
                        años de experiencia.
                        Nuestros contenedores son fabricados 
                        por inyección de plásticos rígidos, aditivados
                        con diferentes emolientes que le confieren la
                        más alta estabilidad mecánica y química.
                    </p>
                    <ButtonBlack />
        </div>
    )
}

function ButtonBlack() {
    return (
      <Stack spacing={2} direction="row">
        <Button variant="contained">VER MÁS</Button>
      </Stack>
    );
  }

export default Leaders;
