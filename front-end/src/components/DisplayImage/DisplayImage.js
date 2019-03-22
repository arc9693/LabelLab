import React, { Component } from 'react';
import request from "superagent";
import { Stage, Layer, Rect ,Group,Text } from 'react-konva';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import './DisplayImage.css'

export default class DisplayImage extends Component {

	constructor(props) {
		super(props);
		this.state = { url:"http://localhost:5000/",id:this.props.match.params.id,image:{},labels:[] };
		this.deleteImage = this.deleteImage.bind(this);
	}

	componentDidMount() {
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
			})}

	deleteImage(e)
	{
		e.preventDefault();
		request
			.delete(this.state.url+this.props.match.params.id)
			.query(null)
			.set('Accept', 'application/json')
			.end ((error)=>{
				if(error){
					console.log(error);
					this.props.history.push('*/*/*');
					return;
				}
				this.props.history.push('/')
			})}

	render() {
		var {image,labels}=this.state;
		return (
			<div className="container-fluid p-0">
				<div className="row m-0">
					<div className="col-2 details pt-5 pl-1">
						<h6>NAME :<br/> {image.Name}</h6><Divider />
						<h6>HEIGHT : {image.height}</h6><Divider />
						<h6>WIDTH : {image.width}</h6><Divider />
						{labels.length!==0&&(<div>
							<h6 className="mb-0">LABELS : </h6>
							<ul>
								{this.state.labels.map(function(label, index){
									return (<li key={index}>{label.Label}</li>)})}
							</ul>
						</div>)}
						<div className="mt-2 p-0 m-0 row justify-content-center">
							<Fab color="secondary" size="small" data-toggle="tooltip" title="Add label"  onClick={(e)=>this.props.history.push(`/label/`+this.state.id)}  className="ml-1 iconbutton"><AddIcon /></Fab>
							{labels.length!==0&&(<Fab color="secondary" size="small" data-toggle="tooltip" title="Remove labels" className="ml-1 iconbutton"><RemoveIcon /></Fab>)}
							<Fab color="secondary" size="small" data-toggle="tooltip" title="Delete image" onClick={this.deleteImage}  className="ml-1 iconbutton"><DeleteIcon /></Fab>
							<Fab color="secondary" size="small" data-toggle="tooltip" title="Back to all images"  onClick={(e)=>this.props.history.push('/')}  className="ml-1 iconbutton"><KeyboardReturnIcon /></Fab>
						</div>
					</div>
					<div className="col-10">
						<div className="row justify-content-center mt-3">
							<img ref="image" src={this.state.url+'uploads/'+image.Name} alt={image.Name} style={{position:'absolute'}}/>
							<Paper elevation={8} style={{height:this.state.height,width:this.state.width}}>
								<Stage height={image.height} width={image.width}>
									<Layer>
										<Group>{this.state.labels.map(function(label, index){
											return (<Rect name="label"
												x={label.x}
												y={label.y}
												width={label.width}
												height={label.height}
												stroke="#fff"/>)})}
										{this.state.labels.map(function(label, index){
											return (<Text x={label.x} y={label.y+label.height+10} text={label.Label} fontFamily='sans-serif' fontSize={18} padding={5} fill='#fff' />)})}
										</Group>
									</Layer>
								</Stage>
							</Paper>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
