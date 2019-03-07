import React, { Component } from 'react';
import request from "superagent";
import { Stage, Layer, Rect } from 'react-konva';
import './LabelImage.css'
export default class LabelImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url:"http://localhost:5000/",
			id:this.props.match.params.id,
			image:{},
			isDragging: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		request
			.put(this.state.url+this.props.match.params.id)
			.set('Content-Type', 'application/json')
			.send({id:this.state.id,x:this.state.image.x,y:this.state.image.y,height:this.state.image.height,width:this.state.image.width,label:this.state.image.label })
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				const data=response.body;
				console.log(JSON.stringify(data));
			})
	}

	componentDidMount() {
		request
			.get(this.state.url+this.props.match.params.id)
			.query(null)
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				const data=response.body;
				console.log(JSON.stringify(data));
				this.setState({
					image:data[0]
				})
			})
	}

	onImgLoad ({ target: img }) {
		this.setState({
			width: img.width,
			height: img.height,
		});
	}

	render() {
		var {image}=this.state;
		return (
			<div className="container p-2">
				<img ref="image" onLoad={this.onImgLoad} src={this.state.url+'uploads/'+image.name} alt={image.name} style={{position:'absolute',zIndex:'-1'}}/>
				<Stage height={this.state.height} width={this.state.width} >
					<Layer>
						<Rect
							x={image.x}
							y={image.y}
							width={image.width}
							height={image.height}
							shadowBlur={10}
							draggable
							onDragStart={() => {
								this.setState({
									isDragging: true
								});
							}}
							onDragEnd={e => {
								let imageCopy = JSON.parse(JSON.stringify(this.state.image))
								//make changes to ingredients
								imageCopy.x= e.target.x();
								imageCopy.y= e.target.y() //whatever new ingredients are
								this.setState({
									isDragging: false,
									image: imageCopy
								});
							}}
							stroke="black"
						/>
					</Layer>
				</Stage>
				<div className="row">
					<div className="col-3 m-2">
						<form className="labelform p-2">
							<div className="form-group row m-1">
								<label className="col-3">Label: </label>
								<div className="col-8 ml-1">
									<input
										className="form-control"
										placeholder="Label"
										value={image.label||' '}
										onChange={e => {
											let imageCopy = JSON.parse(JSON.stringify(this.state.image))
											//make changes to ingredients
											imageCopy.label= e.target.value; //whatever new ingredients are
											this.setState({
												image: imageCopy
											});
										}}/>
								</div>
							</div>
							<div className="form-group row m-1">
								<label className="col-3">Height: </label>
								<div className="col-8 ml-1">
									<input
										className="form-control"
										placeholder="Height"
										value={image.height||' '}
										onChange={e => {
											let imageCopy = JSON.parse(JSON.stringify(this.state.image))
											//make changes to ingredients
											imageCopy.height= e.target.value; //whatever new ingredients are
											this.setState({
												image: imageCopy
											});
										}}/>
								</div>
							</div>
							<div className="form-group row m-1">
								<label className="col-3">Width: </label>
								<div className="col-8 ml-1">
									<input
										className="form-control"
										placeholder="Width"
										value={image.width||' '}
										onChange={e => {
											let imageCopy = JSON.parse(JSON.stringify(this.state.image))
											//make changes to ingredients
											imageCopy.width= e.target.value; //whatever new ingredients are
											this.setState({
												image: imageCopy
											});
										}}/>
								</div>
							</div>
							<div className="row m-1 justify-content-center">
								<button type="submit" className="btn btn-light btn-sm p-0"  onClick={this.handleSubmit}>Done</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
