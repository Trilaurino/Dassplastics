import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import Settings from './Settings';
import { withTranslation } from '../../i18n';
import MobileMenu from './MobileMenu';
import logo from '../../public/images/dassplastic-logo.svg';
import brand from '../../public/text/brand';
import routeLink from '../../public/text/link';
import useStyles from './header-style';
import navMenu from './menu';

let counter = 0;
function createData(name, url, offset) {
	counter += 1;
	return {
		id: counter,
		name,
		url,
		offset,
	};
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
	// eslint-disable-line
	return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
	// Theme breakpoints
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

	const [fixed, setFixed] = useState(false);
	let flagFixed = false;
	const handleScroll = () => {
		const doc = document.documentElement;
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const newFlagFixed = scroll > 80;
		if (flagFixed !== newFlagFixed) {
			setFixed(newFlagFixed);
			flagFixed = newFlagFixed;
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);
	const classes = useStyles();
	const { onToggleDark, onToggleDir, invert, t } = props;
	const [menuList] = useState([
		createData(navMenu[0], navMenu[0], 200),
		createData(navMenu[1], navMenu[1], 200),
	]);
	const [openDrawer, setOpenDrawer] = useState(false);
	const handleOpenDrawer = () => {
		setOpenDrawer(!openDrawer);
	};
	return (
		<Fragment>
			{isMobile && (
				<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />
			)}
			<AppBar
				component='div'
				position='relative'
				id='header'
				className={clsx(
					classes.header,
					fixed && classes.fixed,
					openDrawer && classes.openDrawer
				)}>
				<Container fixed={isDesktop}>
					<div className={classes.headerContent}>
						<nav className={clsx(classes.navLogo, invert && classes.invert)}>
							{isMobile && (
								<IconButton
									onClick={handleOpenDrawer}
									className={clsx(
										'hamburger hamburger--spin',
										classes.mobileMenu,
										openDrawer && 'is-active'
									)}>
									<span className='hamburger-box'>
										<span className={clsx(classes.bar, 'hamburger-inner')} />
									</span>
								</IconButton>
							)}
							<div className={classes.logo}>
								{invert ? (
									<Link href='/'>
										<a>
											<img src={logo} alt='logo' />
											<span>{brand.dassplastic.name}</span>
										</a>
									</Link>
								) : (
									<a href='/'>
										<img src={logo} alt='logo' />
										<span>{brand.dassplastic.name}</span>
										<span className={classes.subtitle}>del Mercosur SRL</span>
									</a>
								)}
							</div>
						</nav>
						<nav className={clsx(classes.navMenu, invert && classes.invert)}>
							{isDesktop && (
								<Scrollspy items={navMenu} currentClassName='active'>
									{menuList.map((item) => (
										<li key={item.id.toString()}>
											{invert ? (
												// eslint-disable-next-line
												<Button href={'/' + item.url}>
													<span className={classes.text}>
														{t(
															'common:dassplastic-landing.header_' + item.name
														)}
													</span>
												</Button>
											) : (
												// eslint-disable-next-line
												<Button
													href={
														item.name === 'about_us'
															? `/#${item.url}`
															: item.url
													}>
													<span className={classes.text}>
														{t(
															'common:dassplastic-landing.header_' + item.name
														)}
													</span>
												</Button>
											)}
										</li>
									))}
								</Scrollspy>
							)}
						</nav>
						<nav className={clsx(classes.navMenu, classes.navAuth)}>
							<Hidden xsDown>
								<div className={classes.deco} />
								<Button
									className={classes.btnWhite}
									href={routeLink.dassplastic.contact}
									variant='contained'>
									{t('common:dassplastic-landing.about_join')}
								</Button>
							</Hidden>
							<Settings
								toggleDark={onToggleDark}
								toggleDir={onToggleDir}
								invert={invert}
							/>
						</nav>
					</div>
				</Container>
			</AppBar>
		</Fragment>
	);
}

Header.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
	invert: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

Header.defaultProps = {
	invert: false,
};

export default withTranslation(['common'])(Header);
