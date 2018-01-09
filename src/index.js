'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


var records = 
[			
	{
		id: 1,
		first_name: "Jared",
		last_name: "Spier",
		city: "Atlanta",
		state: "Georgia",
		zip: "30341",
		initial_date: "08/26/2008",
		disease: "AIDS"
	},
	{
		id: 2,
		first_name: "Amy",
		last_name: "Bailey",
		city: "Brookhaven",
		state: "Georgia",
		zip: "30329",
		initial_date: "02/14/2003",
		disease: "Lupis"
	},
	{
		id: 3,
		first_name: "Jordan",
		last_name: "Davenport",
		city: "Dalton",
		state: "Georgia",
		zip: "30705",
		initial_date: "08/11/2013",
		disease: "Lupis"
	}
];


class App extends React.Component {
	
	 render() {
		return (
			<div>
				<Menu/>    
				<Records/>
			</div>
		)
	 };
}



class Menu extends React.Component {
	
	 render() {
		return (
			<nav className="navbar">
			  	<span className="navbar-brand mb-0 h1">Navbar</span>
			</nav>
		)
	 };
}

class Records extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { records };
	};
	
	renderRecords() {		
		var records=[];		  
		this.state.records.forEach(function(record) {		
			records.push(
				<tr key={record.id}>
					<td>{record.first_name}</td>	
					<td>{record.last_name}</td>	
					<td>{record.disease}</td>	
					<td>{record.initial_date}</td>				   
				</tr>					  
			);								   
	   	});
		return records;
	}
	


	render() {
		
		
		  
		  
		return (
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Disease</th>
						<th>Initial Reporting Date</th>
					</tr>
				</thead>
				<tbody>	
					{this.renderRecords()}
				</tbody>
			</table>
		);
	  }
}








ReactDOM.render(
  <App />,
  document.getElementById('root')
);


