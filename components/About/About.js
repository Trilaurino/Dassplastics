import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactWOW from 'react-wow';
import { useText } from '../../theme/common';
import { withTranslation } from '../../i18n';
import imgAPI from '../../public/images/imgAPI';
import useStyles from './about-style';
import routeLink from '../../public/text/link';

function About(props) {
	const classes = useStyles();
	const text = useText();
	const { t } = props;
	return (
		<div className={classes.root}>
			<Container fixed>
				<Grid container justifyContent='center' spacing={8}>
					<Grid item md={6} xs={12} className={classes.illuWrap}>
						<Hidden smDown>
							<div className={clsx(classes.illustration, classes.one)} />
							<figure className={clsx(classes.illustration, classes.two)}>
								<img src={imgAPI.company[0]} alt='about' />
							</figure>
							<figure className={clsx(classes.illustration, classes.three)}>
								<img src={imgAPI.company[1]} alt='about' />
							</figure>
							<figure className={clsx(classes.illustration, classes.four)}>
								<img src={imgAPI.company[2]} alt='about' />
							</figure>
							<div className={clsx(classes.illustration, classes.five)} />
						</Hidden>
					</Grid>
					<Grid item md={6} xs={12}>
						<ReactWOW
							animation='fadeInRight'
							offset={-100}
							delay='0.2s'
							duration='0.6s'>
							<div>
								<div className={classes.title}>
									<Typography variant='h3' className={text.title}>
										<span>{t('common:dassplastic-landing.about_title')}</span>
									</Typography>
								</div>
								<Typography className={text.paragraph}>
									{t('common:dassplastic-landing.about_desc')}
								</Typography>
								<Button
									className={classes.white}
									variant='contained'
									href={routeLink.dassplastic.contact}>
									{t('common:dassplastic-landing.about_join')}
								</Button>
							</div>
						</ReactWOW>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

About.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(['common'])(About);
