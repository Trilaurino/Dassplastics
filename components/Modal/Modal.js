import { Paper } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../context/ModalContext.js';
import productsJson from '../../public/products/products.json';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
	modalBg: {
		background:
			theme.palette.type === 'light'
				? lighten('#fbb03b', 0.9)
				: darken('#fbb03b', 0.7),
	},
}));

const Modal = () => {
	let { modalContent, handleModal, modal } = useContext(ModalContext);
	const [foundItems, setFoundItems] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		productsJson.map((product) =>
			setFoundItems((previousItem) => [...previousItem, product])
		);
	}, []);

	if (modal) {
		const filteredItem = foundItems.filter(
			(instance) => instance.id == modalContent
		);
		return ReactDOM.createPortal(
			<div
				style={{
					background: 'rgba(0,0,0,0.8)',
					position: 'fixed',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: '10000',
				}}>
				<Paper
					style={{
						width: '95vw',
						height: '95vh',
						display: 'grid',
						placeItems: 'center',
						zIndex: '10010',
						maxWidth: '1000px',
						maxHeight: '1000px',
					}}
					className={classes.modalBg}>
					<HighlightOffIcon
						style={{
							position: 'absolute',
							top: '4%',
							right: '3%',
							cursor: 'pointer',
							height: '40px',
							width: '40px',
							color: '#fbb03b',
							zIndex: '1000000',
						}}
						onClick={() => handleModal()}></HighlightOffIcon>
					<div
						style={{
							width: '100%',
							display: 'grid',
							placeItems: 'center',
							borderRadius: '12px',
							overflow: 'hidden',
						}}>
						<Carousel
							style={{
								backgroundColor: 'white',
								minWidth: '500px',
								width: '150%',
							}}
							navButtonsAlwaysVisible>
							{filteredItem[0].image.map((item, i) => (
								<div
									key={item + 'div'}
									style={{ backgroundColor: 'white', minWidth: '350px', textAlign: 'center', minHeight: '300px', borderRadius: '10px'}}>
									<img
										style={{ height: '250px', position: 'relative', top: '25px'}}
										key={i}
										src={`images/products/${item}`}
									/>
								</div>
							))}
						</Carousel>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							width: '100%',
						}}>
						<Typography
							style={{ fontWeight: 'bold', alignSelf: 'center' }}
							variant='h5'>{`${
							filteredItem[0].type.charAt(0).toUpperCase() +
							filteredItem[0].type.slice(1)
						} ${filteredItem[0].id.toUpperCase()}`}</Typography>
						<div style={{ fontSize: 14, marginLeft: '5%' }}>
							<ul>
								<li>
									<strong>Tipo: </strong>
									{`${
										filteredItem[0].type.charAt(0).toUpperCase() +
										filteredItem[0].type.slice(1)
									}`}
								</li>
								<li>
									<strong>Forma: </strong>
									{`${
										filteredItem[0].shape.charAt(0).toUpperCase() +
										filteredItem[0].shape.slice(1)
									}`}
								</li>
								<li>
									<strong>Altura: </strong>
									{`${
										filteredItem[0].height.charAt(0).toUpperCase() +
										filteredItem[0].height.slice(1)
									}`}
								</li>
								<li>
									<strong>Capacidad: </strong>
									{`${
										filteredItem[0].capacity.charAt(0).toUpperCase() +
										filteredItem[0].capacity.slice(1)
									}`}
								</li>
								{filteredItem[0].diameter_internal ? (
									<li>
										<strong>Diametro interno: </strong>
										{`${
											filteredItem[0].diameter_internal
												.charAt(0)
												.toUpperCase() +
											filteredItem[0].diameter_internal.slice(1)
										}`}
									</li>
								) : (
									<li>
										<strong>Peso: </strong>
										{`${
											filteredItem[0].weight.charAt(0).toUpperCase() +
											filteredItem[0].weight.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].diameter_lip && (
									<li>
										<strong>Diametro de labio: </strong>
										{`${
											filteredItem[0].diameter_lip.charAt(0).toUpperCase() +
											filteredItem[0].diameter_lip.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].diameter_inferior ? (
									<li>
										<strong>Diametro inferior: </strong>
										{`${
											filteredItem[0].diameter_inferior
												.charAt(0)
												.toUpperCase() +
											filteredItem[0].diameter_inferior.slice(1)
										}`}
									</li>
								) : (
									<li>
										<strong>Plantas: </strong>
										{`${
											filteredItem[0].plants.charAt(0).toUpperCase() +
											filteredItem[0].plants.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].material && (
									<li>
										<strong>Material: </strong>
										{`${
											filteredItem[0].material.charAt(0).toUpperCase() +
											filteredItem[0].material.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].ribs && (
									<li>
										<strong>Encastre: </strong>
										{`${
											filteredItem[0].ribs.charAt(0).toUpperCase() +
											filteredItem[0].ribs.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].openings && (
									<li>
										<strong>Aperturas: </strong>
										{`${
											filteredItem[0].openings.charAt(0).toUpperCase() +
											filteredItem[0].openings.slice(1)
										}`}
									</li>
								)}
								{filteredItem[0].tray && (
									<li>
										<strong>Bandeja: </strong>
										{`${
											filteredItem[0].tray.charAt(0).toUpperCase() +
											filteredItem[0].tray.slice(1)
										}`}
									</li>
								)}
							</ul>
						</div>
					</div>
				</Paper>
			</div>,
			document.querySelector('#modal-root')
		);
	} else return null;
};
export default Modal;
