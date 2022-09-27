import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import useStyles from './cards-style';
import { SearchContext } from '../../context/SearchContext';
import productsJson from '../../public/products/products.json';
import Router from 'next/router'

function Category(props) {
	const classes = useStyles();
	const { img, title, desc, type } = props;

	const [foundItems, setFoundItems] = useContext(SearchContext);

	function filterCard(keyword) {
		const results = productsJson.filter((product) => {
			return (
				product.type.toLowerCase().startsWith(keyword.toLowerCase()) +
				product.id.includes(keyword.toLowerCase())
			);
		});
		setFoundItems(results);
    Router.push('#popular')
	}

	return (
		<div className={classes.cardWrap}>
			<span className={classes.fold} />
			<ButtonBase
				className={classes.categoryCard}
				focusRipple
				onClick={() => filterCard(type)}>
				<span className={classes.figure}>
					<img src={img} alt='img' />
				</span>
				<span className={classes.property}>
					<Typography component='span' className={classes.title}>
						{title}
					</Typography>
					<Typography component='span' className={classes.descCategory}>
						{desc}
					</Typography>
				</span>
			</ButtonBase>
		</div>
	);
}

Category.propTypes = {
	img: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Category;
