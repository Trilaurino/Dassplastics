import React, { useRef, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Carousel from 'react-slick';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { withTranslation } from '../../i18n';
import DotParallax from '../Parallax/Dots';
import Title from '../Title';
import GeneralCard from '../Cards/General';
import useStyle from './popular-course-style';
import productList from '../../public/products/products.json';
import { SearchContext } from '../../context/SearchContext';

const courseData = [
	{
		img: `images/products/${productList[0].image[0]}`,
		title: `${
			productList[0].type.charAt(0).toUpperCase() + productList[0].type.slice(1)
		} ${productList[0].id.toUpperCase()}`,
		href: '',
		desc: `${
			productList[0].type.charAt(0).toUpperCase() + productList[0].type.slice(1)
		} de ${productList[0].capacity}, con ${productList[0].shape}.`,
		id: productList[0].id,
	},
	{
		img: `images/products/${productList[5].image[0]}`,
		title: `${
			productList[5].type.charAt(0).toUpperCase() + productList[5].type.slice(1)
		} ${productList[5].id.toUpperCase()}`,
		href: '',
		desc: `${
			productList[5].type.charAt(0).toUpperCase() + productList[5].type.slice(1)
		} de ${productList[5].capacity}, con ${productList[5].shape}.`,
		id: productList[5].id,
	},
	{
		img: `images/products/${productList[36].image[0]}`,
		title: `${
			productList[36].type.charAt(0).toUpperCase() +
			productList[36].type.slice(1)
		} ${productList[36].id.toUpperCase()}`,
		href: '',
		desc: `${
			productList[36].type.charAt(0).toUpperCase() +
			productList[36].type.slice(1)
		} de ${productList[36].capacity}, con ${productList[36].shape}.`,
		id: productList[36].id,
	},
	{
		img: `images/products/${productList[6].image[0]}`,
		title: `${
			productList[6].type.charAt(0).toUpperCase() + productList[6].type.slice(1)
		} ${productList[6].id.toUpperCase()}`,
		href: '',
		desc: `${
			productList[6].type.charAt(0).toUpperCase() + productList[6].type.slice(1)
		} de ${productList[6].capacity}, con ${productList[6].shape}.`,
		id: productList[6].id,
	},
	{
		img: `images/products/${productList[12].image[0]}`,
		title: `${
			productList[12].type.charAt(0).toUpperCase() +
			productList[12].type.slice(1)
		} ${productList[12].id.toUpperCase()}`,
		href: '',
		desc: `${
			productList[12].type.charAt(0).toUpperCase() +
			productList[12].type.slice(1)
		} de ${productList[12].capacity}, con ${productList[12].shape}.`,
		id: productList[12].id,
	},
	{
		img: `images/products/${productList[3].image[0]}`,
		href: '',
		desc: `${
			productList[3].type.charAt(0).toUpperCase() + productList[3].type.slice(1)
		} de ${productList[3].capacity}, con ${productList[3].shape}.`,
		id: productList[3].id,
	},
];

function PopularCourse(props) {
	const slider = useRef(null);
	const { t } = props;

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const [items, setItems] = useState([]);
	const [name, setName] = useState('');
	const classes = useStyle();
	const [foundItems, setFoundItems] = useContext(SearchContext);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		autoplay: false,
		slidesToShow: 4,
		arrows: false,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	useEffect(() => {
		if (theme.direction === 'rtl') {
			const lastSlide = Math.floor(courseData.length - 2);
			slider.current.slickGoTo(lastSlide);
		}
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.parallaxWrap}>
				<DotParallax />
			</div>
			<Container>
				<div className={classes.floatingTitle}>
					<Title
						head={t('common:dassplastic-landing.popular_title')}
						desc={t('common:dassplastic-landing.popular_desc')}
						align={isMobile ? 'center' : 'left'}
						color='primary'
						dark
					/>
				</div>
			</Container>
			<div className={classes.sliderWrap}>
				<div className={classes.carousel}>
					<Carousel ref={slider} {...settings}>
						{isDesktop && (
							<div className={clsx(classes.props, classes.itemPropsFirst)}>
								<div />
							</div>
						)}

						{foundItems && foundItems.length > 0
							? foundItems.map((user, index) => (
									<div key={index.toString()} className={classes.item}>
										<GeneralCard
											className={classes.cardoverrides}
											img={'images/products/' + user.image[0]}
											title={`${
												user.type.charAt(0).toUpperCase() + user.type.slice(1)
											} ${user.id.toUpperCase()}`}
											desc={`${
												user.type.charAt(0).toUpperCase() + user.type.slice(1)
											} de ${user.capacity}, con ${user.shape}.`}
											key={index}
											productId={user.id}
										/>
									</div>
							))
							: courseData.map((item, index) => (
									<div key={index.toString()} className={classes.item}>
										<GeneralCard
											img={item.img}
											title={item.title}
											desc={item.desc}
											productId={item.id}
										/>
									</div>
							))}

						{isDesktop && (
							<div className={clsx(classes.props, classes.itemPropsLast)}>
								<div />
							</div>
						)}
					</Carousel>
				</div>
				<IconButton
					className={clsx(classes.nav, classes.prev)}
					onClick={() => slider.current.slickPrev()}>
					<i className='ion-ios-arrow-back' />
				</IconButton>
				<IconButton
					className={clsx(classes.nav, classes.next)}
					onClick={() => slider.current.slickNext()}>
					<i className='ion-ios-arrow-forward' />
				</IconButton>
			</div>
		</div>
	);
}

PopularCourse.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(['common'])(PopularCourse);
