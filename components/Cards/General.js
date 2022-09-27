import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useText } from '../../theme/common';
import useStyles from './cards-style';
import { ModalContext } from '../../context/ModalContext';

export default function General(props) {
  let { handleModal } = useContext(ModalContext);
  const classes = useStyles();
  const text = useText();
  const {
    img,
    title,
    desc,
  } = props;
  return (
    <Paper className={classes.generalCard}>
      <figure>
        <img src={img} alt={title} />
      </figure>
      <div className={classes.desc}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography className={text.paragraph}>
          {desc}
        </Typography>
        <div className={classes.property}>
        </div>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={() => handleModal(props.productId)}
        >
          Mas información
        </Button>
      </div>
    </Paper>
  );
}

General.propTypes = {
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
