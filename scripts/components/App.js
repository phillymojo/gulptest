import React from 'react';
import $ from 'jquery';
window.$ = $;
import Navigation from './Navigation';

var App = React.createClass({
	render: function(){
		return(
			<div className="container">
				<Navigation />
			</div>
		)
	}
})

export default App;