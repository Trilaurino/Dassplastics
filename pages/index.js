import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PopularCourse from '../components/PopularCourse';
import Explore from '../components/Explore/Explore';
import About from '../components/About/About';
import Footer from '../components/Footer';
import brand from '../public/text/brand';

const sectionMargin = (margin) => margin * 20;
const useStyles = makeStyles((theme) => ({
	mainWrap: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
		background:
			theme.palette.type === 'dark'
				? theme.palette.background.default
				: theme.palette.background.paper,
	},
	spaceBottom: {
		paddingBottom: sectionMargin(theme.spacing()),
		[theme.breakpoints.down('md')]: {
			paddingBottom: sectionMargin(6),
		},
	},
	spaceBottomShort: {
		paddingBottom: sectionMargin(theme.spacing() / 2),
	},
	spaceTop: {
		paddingTop: sectionMargin(theme.spacing(0.5)),
		[theme.breakpoints.down('md')]: {
			paddingTop: sectionMargin(6),
		},
		[theme.breakpoints.down('xs')]: {
			paddingTop: sectionMargin(4),
		},
	},
	spaceTopShort: {
		paddingTop: sectionMargin(theme.spacing() / 10),
	},
	containerWrap: {
		'& > section': {
			position: 'relative',
		},
	},
}));

function Landing(props) {
	const classes = useStyles();
	const { onToggleDark, onToggleDir } = props;
	return (
		<React.Fragment>
			<Head>
				<title>
					{brand.dassplastic.name}
					&nbsp; - Bienvenido!
				</title>
			</Head>
			<CssBaseline />
			<div className={classes.mainWrap}>
				<Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
				<main className={classes.containerWrap}>
					<section id='home' className={classes.spaceBottom}>
						<Banner />
					</section>
					<section id='popular' className={classes.spaceTop}>
						<PopularCourse />
					</section>
					<section id='explore'>
						<Explore />
					</section>
					<div id='about_us'>
						<About />
					</div>
					<Footer toggleDir={onToggleDir} />
				</main>
			</div>
		</React.Fragment>
	);
}

Landing.getInitialProps = async () => ({
	namespacesRequired: ['common'],
});

Landing.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Landing;
