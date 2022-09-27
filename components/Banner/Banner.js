import React, { useState, useEffect, useContext } from 'react';
import productsJson from '../../public/products/products.json';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSpring, animated } from 'react-spring';
import { useText } from '../../theme/common';
import { withTranslation } from '../../i18n';
import useStyles from './banner-style';
import { SearchContext } from '../../context/SearchContext';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 4 + 35}px,${y / 4 - 230}px,0)`;

function Banner(props) {
	// Theme breakpoints
	const theme = useTheme();
	const text = useText();
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
	const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
	const [name, setName] = useState('');

	// Translation function
	const { t } = props;

	// Search box
	const [values, setValue] = useState({
		query: '',
	});
	const classes = useStyles();
	const [foundItems, setFoundItems] = useContext(SearchContext);
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (isDesktop) {
			/* Attention
			 ** HandleScroll function to optimize site with video background may give an error log
			 ** Uncaught TypeError: Cannot read property 'src' of null
			 ** It's because HMR in development mode, and react-youtube need to refresh.
			 ** The error log will not happen in production mode or just reload browser (development mode)
			 ** You can uncomment _onPlay() function, if you don't want see error browser log.
			 ** But then every changes you make, the browser will auto reload.
			 */
			// _onPlay();
		}
	}, []);

	const filter = (e) => {
		const keyword = e.target.value;

		if (keyword !== '') {
			const results = productsJson.filter((product) => {
				return (
					product.type.toLowerCase().startsWith(keyword.toLowerCase()) +
					product.id.includes(keyword.toLowerCase())
				);
				// Use the toLowerCase() method to make it case-insensitive
			});
			setFoundItems(results);
		} else {
			setFoundItems(productsJson);
			// If the text field is empty, show all users
		}
		setName(keyword);
	};

	const [position, setPosition] = useSpring(() => ({
		xy: [0, 0],
		config: { mass: 300, tension: 200, friction: 240 },
	}));

	return (
		<div className={classes.heroContent}>
			<Container
				fixed={isDesktop}
				onMouseMove={({ clientX: x, clientY: y }) =>
					setPosition({ xy: calc(x, y) })
				}>
				<Grid container spacing={6} className={classes.bannerContainer}>
					<Grid item lg={6} md={7} xs={12}>
						<div className={classes.bannerText}>
							<div className={classes.title}>
								<Typography variant='h3' className={text.title}>
									{t('Bienvenido!')}
								</Typography>
							</div>
							<Typography className={classes.subtitle} variant='h5'>
								{t('common:dassplastic-landing.banner_desc')}
							</Typography>
							<Paper className={classes.searchBanner}>
								<TextField
									className={classes.search}
									color='primary'
									label={t('common:dassplastic-landing.banner_search')}
									onChange={filter}
								/>
								<div className={classes.action}>
									<IconButton className={classes.button} color='primary'>
										<SearchIcon className={classes.icon} />
									</IconButton>
								</div>
							</Paper>
						</div>
					</Grid>
					{isTablet && (
						<Grid item lg={6} className={classes.decoGrid}>
							<div className={classes.decoBanner}>
								<div className={classes.artworkBg}>
									<div className={classes.oval} />
									<div className={clsx(classes.parallaxScene, classes.back)}>
										<animated.div
											style={{ transform: position.xy.interpolate(trans1) }}>
											<span className={classes.iconThree} />
										</animated.div>
										<animated.div
											style={{ transform: position.xy.interpolate(trans2) }}>
											<span className={classes.iconTwo} />
										</animated.div>
									</div>
									<img
										style={{ transform: 'translate(0, -100px) rotate(10deg)' }}
										src='/images/dassplastic/banner-artwork.png'
										alt='artwork'
									/>
									<div className={clsx(classes.parallaxScene, classes.front)}>
										<animated.div
											style={{ transform: position.xy.interpolate(trans3) }}>
											<span className={classes.iconFour} />
										</animated.div>
										<animated.div
											style={{ transform: position.xy.interpolate(trans4) }}>
											<span className={classes.iconOne} />
										</animated.div>
									</div>
								</div>
							</div>
						</Grid>
					)}
				</Grid>
			</Container>
		</div>
	);
}

Banner.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(['common'])(Banner);
