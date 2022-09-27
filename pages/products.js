import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../public/text/brand';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import ProductsFilter from '../components/Products';

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
		paddingTop: sectionMargin(theme.spacing()),
		[theme.breakpoints.down('md')]: {
			paddingTop: sectionMargin(6),
		},
		[theme.breakpoints.down('xs')]: {
			paddingTop: sectionMargin(4),
		},
	},
	spaceTopShort: {
		paddingTop: sectionMargin(theme.spacing() / 2),
	},
	containerWrap: {
		'& > section': {
			position: 'relative',
		},
	},
}));

function Products(props) {
	const classes = useStyles();
	const { onToggleDark, onToggleDir } = props;

	return (
		<React.Fragment>
			<Head>
				<title>
					{brand.dassplastic.name}
					&nbsp; - Home Page
				</title>
			</Head>
			<CssBaseline />
			<div className={classes.mainWrap}>
				<Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
				<main className={classes.containerWrap}>
					<ProductsFilter />
				</main>
			</div>
		</React.Fragment>
	);
}

export default Products;

Products.getInitialProps = async () => ({
	namespacesRequired: ['common'],
});
