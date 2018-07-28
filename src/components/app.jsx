import { h, Component } from 'preact';

import './app.css';
import SmallCaps from './SmallCaps';
import Stats from './Stats';
import Strand from './strand/Strand';
import Debug from './Debug';

export default function App({ }, { }) {
	return (
		<div class="app">
			<main>
				<Strand />
				<Debug />
			</main>
			<footer>
				<h1><SmallCaps>The Lady's Book Of Decency</SmallCaps></h1>
				<h2>A Practical Treatise on Manners, Feeding, and Etiquette</h2>
			</footer>
		</div>
	);
}
