import { h, Component } from 'preact';

import './app.css';
import Stats from './Stats';
import Debug from './Debug';

export default function App({ }, { }) {
	return (
		<div class="app">
				<Stats />
				<Debug />
		</div>
	);
}
