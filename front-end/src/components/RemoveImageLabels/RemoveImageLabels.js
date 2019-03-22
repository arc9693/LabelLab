import React, { Component } from 'react';
import request from "superagent";
import { Stage, Layer, Rect,Transformer,Group,Text } from 'react-konva';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import './RemoveImageLabels.css'
export default class LabelImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url:"http://localhost:5000/",
			id:this.props.match.params.id,
			image:{},
			labels:[]
		};
		this.fetch= this.fetch.bind(this);
		this.deleteLabel = this.deleteLabel.bind(this);
	}

	componentDidMount() {
		this.fetch();
	}

	fetch() {
		request
			.get(this.state.url+this.props.match.params.id)
			.query(null)
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				if(error){
					console.log(error);
					this.props.history.push('*/*/*');
					return;
				}
				const data=response.body;

				this.setState({
					image:data.Image,
					labels:data.Labels
				})

				if(!data.Labels.length){
					this.props.history.push('/');}
			})
	}

	deleteLabel(e,label) {
		e.preventDefault();
		request
			.delete(this.state.url+this.props.match.params.id+'/labels/remove/'+label.ID)
			.set('Content-Type', 'application/json')
			.send(this.state.newlabel)
			.set('Accept', 'application/json')
			.end ((error)=>{
				if(error) {console.log(error);return;}
				this.fetch();
			})
	}

	render() {
		var {image,labels,newlabel}=this.state;
		return (
			<div className="container-fluid p-0" id="LabelImage">
				<div className="row m-0">
					<div className="col-2 details pt-5 pl-1">
						<h6>NAME : {image.Name}</h6><Divider/>
						<h6>HEIGHT : {image.height}</h6><Divider/>
						<h6>WIDTH : {image.width}</h6><Divider/>
						<div>
							<h6 className="mb-0">LABELS : </h6>
							<ul>
								{this.state.labels.map(function(label, index){
									return (<li key={index}>{label.Label}</li>)})}
							</ul>
						</div>
						<div className="mt-2 p-0 m-0 row justify-content-center">
							<Fab color="secondary" size="small" data-toggle="tooltip" title="done"  onClick={(e)=>this.props.history.push('/')}  className="ml-1 iconbutton"><CheckIcon /></Fab>
						</div>
					</div>
					<div className="col-10">
						<h6 className="font-italic text-muted">Note: Click on the cross to delete a label.</h6>
						<div className="row justify-content-center">
							<img ref="image" src={this.state.url+'uploads/'+image.Name} alt={image.Name} style={{position:'absolute'}}/>
							<Paper elevation={8} style={{height:image.height,width:image.width}}>
								<Stage height={image.height} width={image.width}>
									<Layer>
										<Group>{this.state.labels.map(function(label, index){
											return (<Rect name="label"
												key={label.ID}
												x={label.x}
												y={label.y}
												width={label.width}
												height={label.height}
												stroke="#fff"/>)})}
										{this.state.labels.map(function(label, index){
											return (<Text key={label.ID} x={label.x} y={label.y+label.height+10} text={label.Label} fontFamily='sans-serif' fontSize={18} padding={5} fill='#fff' />)})}
										</Group>
									</Layer>
								</Stage>
							</Paper>
							<div style={{position:'absolute',height:image.height,width:image.width}}>
								{this.state.labels.map(function(label, index){
									return (<Fab color="default" size="small" data-toggle="tooltip" key={label.ID} title={label.Label}  onClick={(e)=>this.deleteLabel(e,label)}  className="iconbutton crossbutton" style={{position:'absolute',top:label.y-12,left:label.x-12}}><ClearIcon /></Fab>)}.bind(this))}
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}
