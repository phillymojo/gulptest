import React from 'react';
global.$ = require('jquery')
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