import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import api from '../services/api';

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg,
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [170, 2]
});

function OphanagesMap() {

	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('orphanages').then(res => {
			setOrphanages(res.data);
		})
	}, []);

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

				{orphanages.map(orphanage => {
					return (
						<Marker key={orphanage.id} position={[orphanage.latitude,orphanage.longitude]} icon={mapIcon}>
							<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
								{orphanage.name}
								<Link to={`/orphanages/${orphanage.id}`}><FiArrowRight size={20} color="#FFF" /></Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={32} color="#fff"/>
			</Link>
			
			<button onClick={toggle} className="toggle-dark-mode">
				{darkMode ? <FiSun size={32} color="#fff"/> : <FiMoon size={32} color="#fff" />}
			</button>

		</div>
	);
}

export default OphanagesMap;