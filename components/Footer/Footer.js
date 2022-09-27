import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {useTheme} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import LangIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import {i18n} from '../../i18n';
import logo from '../../public/images/dassplastic-logo.svg';
import brand from '../../public/text/brand';
import useStyles from './footer-style';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneMobile from '@material-ui/icons/PhoneIphone'
import InstagramLogo from '@material-ui/icons/Instagram'
import LocationLogo from '@material-ui/icons/LocationOn'

function Copyright() {
  return (<Typography variant='body2' display='block' color='textSecondary'>
    &copy;&nbsp; {brand.dassplastic.footerText}
  </Typography>);
}

const gMapUri = `https://www.google.com/maps/embed/v1/place?q=dassplastic&key=${process.env.GOOGLE_KEY}`;

function GoogleMap() {{}
  return (<div><div style={{display: "flex", marginTop: "10px"}}><LocationLogo/><Typography>San Martín 1100, B1650 San Martín, Provincia de Buenos Aires, Argentina</Typography></div> <iframe width="500" height="180" style={{border:'0', marginTop: '10px'}} loading="lazy" allowfullscreen src={gMapUri}/></div>)}

const footers = [
  {
    title: 'Empresa',
    description: [
      'Inicio', 'Productos', 'Nosotros'
    ],
    link: ['#home', '#products', '#about_us']
  }
];

function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [values, setValues] = useState({lang: 'es'});

  useEffect(() => {
    setValues({lang: i18n.language});
  }, []);

  function handleChange(event) {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    if (event.target.value === 'ara') {
      i18n.changeLanguage('ara');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(event.target.value);
      props.toggleDir('ltr');
    }
  }

  return (<Container maxWidth='lg' component='footer' className={classes.footer}>
    <Grid container="container" spacing={4}>
      <Grid item="item" xs={12} md={3}>
        <Box mr={-2}>
          <div className={classes.logo}>
            <img src={logo} alt='logo'/>
            <Typography variant='h6' color='textPrimary'>
              {brand.dassplastic.projectName}
            </Typography>
          </div>
          <Copyright/>
          <div style={{
              marginTop: '20px'
            }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
              }}><PhoneIcon/>
              <Typography style={{
                  marginLeft: '10px'
                }}>+54 9 4752-5314</Typography>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px'
              }}><PhoneMobile/>
              <Typography style={{
                  marginLeft: '10px'
                }}>+54 9 11-3008-0017</Typography>
            </div>
            <div style={{

                marginTop: '10px',
                display: 'flex',
                alignItems: 'center'
              }}><InstagramLogo/>
              <Typography style={{
                  marginLeft: '10px'
                }}>
                <a href='https://www.instagram.com/dassplastic/' style={{
                    textDecoration: 'none',
                    color: 'black'
                  }}>@dassplastic</a>
              </Typography>
            </div>
				<GoogleMap />
          </div>
        </Box>
      </Grid>
      <Grid item="item" xs={12} md={6}>
        <Grid container="container" spacing={isTablet
            ? 0
            : 4} justifyContent='space-evenly'>
          {
            footers.map((footer) => (<Grid item="item" xs={12} md={3} key={footer.title} className={classes.siteMapItem}>
              {
                isDesktop && (<div>
                  <Typography variant='h6' className={classes.title} color='textPrimary' gutterBottom="gutterBottom">
                    {footer.title}
                  </Typography>
                  <ul>
                    {
                      footer.description.map((item, index) => (<li key={item}>
                        <Link href={footer.link[index]} variant='subtitle1' color='textSecondary'>
                          {item}
                        </Link>
                      </li>))
                    }
                  </ul>
                </div>)
              }
              {
                isMobile && (<Accordion square="square" classes={{
                    root: classes.accordionRoot
                  }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon className = {
                      classes.accordionIcon
                    } />
} aria-controls='panel1a-content' id='panel1a-header' classes={{
                      content: classes.accordionContent
                    }}>
                    <strong>{footer.title}</strong>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {
                        footer.description.map((item, index) => (<li key={item}>
                          <Link href={footer.link[index]} variant='subtitle1' color='textSecondary'>
                            {item}
                          </Link>
                        </li>))
                      }
                    </ul>
                  </AccordionDetails>
                </Accordion>)
              }
            </Grid>))
          }
        </Grid>

      </Grid>
      <Grid item="item" xs={12} md={3}>
        <Select value={values.lang} onChange={handleChange} startAdornment={<InputAdornment className = {
            classes.icon
          }
          position = 'start' > <LangIcon/>
        </InputAdornment>} className={classes.selectLang} input={<OutlinedInput
          labelWidth = {
            200
          }
          name = 'lang'
          id = 'outlined-lang-simple'
          />}>
          <MenuItem value='esp'>Español</MenuItem>
          <MenuItem value='eng'>English</MenuItem>
        </Select>
      </Grid>
    </Grid>
  </Container>);
}

Footer.propTypes = {
  toggleDir: PropTypes.func
};

Footer.defaultProps = {
  toggleDir: () => {}
};

export default Footer;
