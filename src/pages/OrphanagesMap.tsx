import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSun, FiMoon } from 'react-icons/fi';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import { Map, TileLayer } from 'react-leaflet';

import '../styles/pages/orphanages-map.css'

function OphanagesMap() {

	const [darkMode, setDarkMode] = useState(false);

	const toggle = () => {
		setDarkMode(!darkMode);
	}

	return (
		<div id="page-map">
			<aside className={`${darkMode ? 'dark-sidebar' : 'light'}`}>
				<header >
					<img src={ mapMarkerImg } alt="Happy"/>

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Manaus</strong>
					<span>Amazonas</span>
				</footer>
			</aside>

			<Map center={[-3.1124313,-60.0375103]} zoom={15} style={{ width: '100%', height: '100%' }}>
				<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${darkMode ? 'dark' : 'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
			</Map>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#fff"/>
			</Link>
			
			<button onClick={toggle} className="toggle-dark-mode">
				{darkMode ? <FiSun size={32} color="#fff"/> : <FiMoon size={32} color="#fff" />}
			</button>

		</div>
	);
}

export default OphanagesMap;