'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './styles.css';

//TODO: currently loads local json file; remove this line after setting up API JSON
import disease_records from './getRecords.json';






class App extends React.Component {

    constructor() {
        super();

        this.state = {
            diseaseRecords: disease_records[0].records,
            selectedDisease: disease_records[0].name
        };

    }

   componentDidMount() {       
       this.FetchDiseaseData();       
   }
    
    
    FetchDiseaseData() {
        
        //TODO: add fetch function to grab JSON from API
        
    }
    
    

    ChangeDisease = (event) => {
        for (var disease in disease_records) {
            if (disease_records[disease].name === event.target.value) {
                
                this.setState({
                    diseaseRecords: disease_records[disease].records,
                    selectedDisease: disease_records[disease].name
                });
            };
        }
    }   

    RefreshDiseaseData = (event) => {        
        
        this.FetchDiseaseData();        
        
        this.setState({
            diseaseRecords: disease_records[0].records,
            selectedDisease: disease_records[0].name
        })
    }

    render() {
        return (
            <div>
                <Menu selectedDisease={this.state.selectedDisease} diseaseChanged={this.ChangeDisease} refreshClicked={this.RefreshDiseaseData}/>    
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
                    <select onChange={this.props.diseaseChanged} value={this.props.selectedDisease} >                            
                        {this.renderOptions()}    
                    </select>
                </span>

            </nav>
        )
    };
}


class Records extends React.Component {
    
    render() {


        const columns = [{
            Header: 'ID',
            accessor: 'id' 
        }, {
            Header: 'Age',
            accessor: 'age'

        }, {
            Header: 'Case Outbreak Indicator',
            accessor: 'case_outbreak_indicator'           
        }, { 
            Header: 'Death',
            accessor: 'death'           
        }, { 
            Header: 'Duration',
            accessor: 'duration'           
        }, { 
            Header: 'Hospitalized',
            accessor: 'hospitalized'           
        }, { 
            Header: 'Immediate National Notifiable Condition',
            accessor: 'immediate_national_notifiable_condition'           
        }, { 
            Header: 'Pregnancy Status',
            accessor: 'pregnancy_status'           
        }];

        return (
            <ReactTable 
                data={this.props.diseaseRecords}
                columns={columns}>
            </ReactTable>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);


