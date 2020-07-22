import React, { Component } from 'react'
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "../Styles/client.css"

export default class AdminPanel extends Component {
    
    constructor(props){
        super(props);

        this.onChangeCheckType= this.onChangeCheckType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.populateData = this.populateData.bind(this);

        this.state={
            tasks: [],
            dates: [],
            date: "",
            checkIn: false,
            checkOut: false
        };

        axios
            .get("https://www.idid.today/admin/dates")
            .then(res => {
                this.setState({
                    dates: res.data
                    
                });
                console.log(this.state.dates)
            })
            .catch(error => {
                console.log(error);
            });
    }

    

    populateData(){
        if(this.state.checkIn === true){
            return this.state.tasks.map(function(item,index,array){
                return (
                    <Grid item xs={12} sm={4}>
                    <Card id="root">
                        <CardActionArea>
                            
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.employeeName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.task.map(function(item,index,array){
                                    return(
                                        <ul>
                                            <li>Project Name: {item.projectName}</li>
                                            <li>Task Details: {item.details}</li>
                                        </ul>
                                    )
                                    
                                })}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                {item.created}
                            </Button>
                            <Button size="small" color="primary">
                                {item.checkInTime}
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                )
            })
        }
        else if(this.state.checkOut === true){
            // const classes = useStyles();
            return this.state.tasks.map(function(item,index,array){
                return (
                    <Grid item xs={12} sm={4}>
                    <Card>
                        <CardActionArea>
                            
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.employeeName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.task.map(function(item,index,array){
                                    return(
                                        <ul>
                                            <li>Project Name: {item.projectName}</li>
                                            <li>Task Details: {item.details}</li>
                                        </ul>
                                    )
                                    
                                })}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                {item.created}
                            </Button>
                            <Button size="small" color="primary">
                                {item.checkInTime}
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>





                    // <tr>
                    //     <td>{item.employeeName}</td>
                    //     {item.task.map(function(item,index,array){
                    //         return(
                    //             <React.Fragment>
                    //             <td>
                    //                 <ul>
                    //                     <li>{item.projectName}</li>
                                       
                    //                 </ul>
                    //             </td>
                    //             <td>
                    //                 <ul>
                                       
                    //                     <li>{item.details}</li>
                    //                 </ul>
                    //             </td>
                            
                    //             </React.Fragment>
                    //         )
                    //     })}
                    //     <td>{item.created}</td>
                    //     <td>{item.checkOutTime}</td>
                    // </tr>
                )
                    
            })

            // return this.state.tasks.map(tasks =>
            //     <tr>
            //         <td>{tasks.employeeName}</td>
            //         <td>{tasks.task.projectName}</td>
            //         <td>{tasks.task.details}</td>
            //         <td>{tasks.created}</td>
            //         <td>{tasks.checkOutTime}</td>
            //     </tr>
            //     )
        }
       
    }


    onChangeCheckType(e){
        if(e.target.value === "Check In"){
            axios
                .get("https://www.idid.today/admin/check-in/"+ this.state.date)
                .then(res => {
                    this.setState({
                        tasks: res.data,
                        checkIn: true
                    });
                    console.log(this.state.tasks)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if(e.target.value === "Check Out") {
            axios
                .get("https://www.idid.today/admin/check-out/"+ this.state.date)
                .then(res => {
                    this.setState({
                        tasks: res.data,
                        checkOut: true
                    });
                    console.log(this.state.tasks)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    onChangeDate(e){
        this.setState({
            date: e.target.value
        });
    }

    render() {
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <div className = "col-lg-6">
                        <div className = "form-group">
                            <label>Choose Date</label>
                            <select className = "form-control" onChange={this.onChangeDate}>
                            <option selected>Choose</option>
                            {this.state.dates.map((e, key) => {
                                return <option key={key} value={e.value}>{e}</option>;
                            })}
                            </select>
                        </div>
                    </div>
                    <div className = "col-lg-6 ">
                        <div className = "form-group">
                            <label>Choose Check In or Check Out</label>
                            <select className = "form-control" onChange={this.onChangeCheckType}>
                            <option selected>Choose</option>
                            <option>Check In</option>
                            <option>Check Out</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Project</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Check In/Out Time</th>
                            </tr>
                        </thead>
                            <tbody>{this.populateData()}</tbody>
                    </Table> */}
                    <Grid container spacing={3}>
                    {this.populateData()}
                    </Grid>
                    
                </div>
            </div>
        )
    }
}


