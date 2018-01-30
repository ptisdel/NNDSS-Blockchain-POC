'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/datatables.net';

import './styles.css';

var disease_records = 
    
    [
  {
    "name": "NNDSS Food Borne",
    "records": [
      {
        "age": 49,
        "case_outbreak_indicator": "Yes",
        "death": "Yes",
        "duration": 4,
        "hospitalized": "Yes",
        "id": 1,
        "immediate_national_notifiable_condition": "No",
        "pregnancy_status": "No"
      },
      {
        "age": 49,
        "case_outbreak_indicator": "Yes",
        "death": "Yes",
        "duration": 4,
        "hospitalized": "Yes",
        "id": 2,
        "immediate_national_notifiable_condition": "No",
        "pregnancy_status": "No"
      }
    ]
  },
  {
    "name": "NNDSS Airborne",
    "records": [
      {
        "age": 25,
        "case_outbreak_indicator": "No",
        "death": "Yes",
        "duration": 4,
        "hospitalized": "No",
        "id": 1,
        "immediate_national_notifiable_condition": "No",
        "pregnancy_status": "Yes"
      },
      {
        "age": 16,
        "case_outbreak_indicator": "Yes",
        "death": "No",
        "duration": 4,
        "hospitalized": "Yes",
        "id": 2,
        "immediate_national_notifiable_condition": "No",
        "pregnancy_status": "No"
      }
    ]
  }
];

    


class App extends React.Component {
	
    constructor() {
        super();
        this.state = {
            diseaseRecords: disease_records[0].records
        };
        
    }
    
    DiseaseChanged = (event) => {
        
        for (var disease in disease_records) {
            if (disease_records[disease].name == event.target.value) {
                this.setState({
                    diseaseRecords: disease_records[disease].records
                });
            };
        }
        
    }   
    
    RefreshClicked = (event) => {
        this.setState({
            diseaseRecords: disease_records[0].records
        })
    }
    
	 render() {
		return (
			<div>
				<Menu diseaseChanged={this.DiseaseChanged} refreshClicked={this.RefreshClicked}/>    
				<Records diseaseRecords={this.state.diseaseRecords}/>
			</div>
		)
	 };
    
    
    
}



class Menu extends React.Component {
    
    constructor(props) {
		super(props);
        
        
        this.diseaseNames=[];
        for (var disease in disease_records) {
            this.diseaseNames.push(disease_records[disease].name);
        }
        
	};
    
    
    renderOptions() {  
        var diseaseOptions=[];
		this.diseaseNames.forEach(function(diseaseName) {		
			diseaseOptions.push(
				<option key={diseaseName} value={diseaseName}>{diseaseName}</option>
			);								   
	   	});
		return diseaseOptions;
    }
	
	 render() {
		return (
			<nav>
			  	<h1>NNDSS Disease Tracker</h1>
                <span>
                    <button id="refresh-button" onClick={this.props.refreshClicked}>Refresh</button>
                    <select onChange={this.props.diseaseChanged}>                            
                        {this.renderOptions()}    
                    </select>
                </span>
          
			</nav>
		)
	 };
}

class Records extends React.Component {
	
	constructor(props) {
    super(props);
    
  }
    
    componentDidMount() {
        $('#reporting-table').DataTable( {
            "paging":           true,
            "searching":        false,
            "lengthChange":     false,
            "info":             false,
            "pagingType":       "numbers"
        } );
    }
	
	renderRecords() {		
        var records=[];
        console.log(this.props.diseaseRecords);
		this.props.diseaseRecords.forEach(function(record) {		
			records.push(
				<tr key={record.id}>
					<td>{record.id}</td>	
					<td>{record.age}</td>	
					<td>{record.case_outbreak_indicator}</td>	
					<td>{record.death}</td>				   
					<td>{record.duration}</td>			   
					<td>{record.hospitalized}</td>					   
					<td>{record.immediate_national_notifiable_condition}</td>				   
					<td>{record.pregnancy_status}</td>				   
				</tr>					  
			);								   
	   	});
		return records;
	}
	


	render() {
		
		return (
			<table id="reporting-table">
				<thead>
					<tr>
                        <th>ID</th>
						<th>Age</th>
						<th>Case Outbreak Indicator</th>
						<th>Death</th>
						<th>Duration</th>
						<th>Hospitalized</th>
						<th>Immediate National Notifiable Condition</th>
						<th>Pregnancy Status</th>
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


