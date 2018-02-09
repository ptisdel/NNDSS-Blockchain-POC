'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './styles.css';

let srcURL = "https://dum0f49x02.execute-api.us-east-1.amazonaws.com/prod/NNDSSgetRecordsFunction";


class App extends React.Component {

    constructor() {
        super();

        
        this.state = {
            all_records: [],
            selected_records: [],
            selected_disease: ""
        };

    }

   componentDidMount() {       
    
         
       this.FetchDiseaseData();      
   }
    
    
    FetchDiseaseData = () => {
        
        
        fetch(srcURL)
            .then((resp) => resp.json())
            .then((data) => {
            
            var d = JSON.parse(data.body);
            
            this.setState({
                all_records: d,
                selected_records: d[0].records,
                selected_disease: d[0].name
            });
            
          });
        
    }
    
    

    ChangeDisease = (event) => {
        for (var disease in this.state.all_records) {
            if (this.state.all_records[disease].name === event.target.value) {
                
                this.setState({
                    selected_records: this.state.all_records[disease].records,
                    selected_disease: this.state.all_records[disease].name
                });
            };
        }
    }   

   

    render() {
        return (
            <div>
                <Menu all_records={this.state.all_records} selected_disease={this.state.selected_disease} diseaseChanged={this.ChangeDisease} refreshClicked={this.FetchDiseaseData}/>    
                <Records selected_records={this.state.selected_records}/>
            </div>
        )
    };



}



class Menu extends React.Component {


    renderOptions() {  
        
        this.diseaseNames=[];
        for (var disease in this.props.all_records) { 
            this.diseaseNames.push(this.props.all_records[disease].name);
        }
        
        
        var diseaseOptions=[];
        this.diseaseNames.forEach(function(diseaseName) {		
            diseaseOptions.push(
                <option key={diseaseName} value={diseaseName}>{diseaseName}</option>
            );								   
        });        
        
        if (diseaseOptions.length<1) { diseaseOptions.push(<option key="Loading..." value="Loading...">Loading...</option>);}
        
        return diseaseOptions;
        
    }

    render() {
        return (
            <nav>
                <h1>NNDSS Disease Tracker</h1>
                <span>
                    <button id="refresh-button" onClick={this.props.refreshClicked}>Refresh</button>
                    <select onChange={this.props.diseaseChanged} value={this.props.selected_disease} >                            
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
                data={this.props.selected_records}
                columns={columns}>
            </ReactTable>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);


