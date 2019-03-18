import React, { Component } from 'react';
import request from "superagent";
import { Stage, Layer, Rect,Transformer } from 'react-konva';
import './LabelImage.css'
export default class LabelImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url:"http://localhost:5000/",
			id:this.props.match.params.id,
			image:{},
			isDragging: false,
			isHovered:false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onImgLoad = this.onImgLoad.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		request
			.put(this.state.url+this.props.match.params.id)
			.set('Content-Type', 'application/json')
			.send({id:this.state.id,x:this.state.image.x,y:this.state.image.y,height:this.state.image.height,width:this.state.image.width,label:this.state.image.label })
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				if(error) {console.log(error);return;}
				let path = `/`+this.state.id;
				this.props.history.push(path);
			})
	}

	componentDidMount() {
		request
			.get(this.state.url+this.props.match.params.id)
			.query(null)
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				if(error){console.log(error);
					this.props.history.push('*/*/*');return;}
				const data=response.body;
				console.log(JSON.stringify(data));
				this.setState({
					image:data[0]
				})
			})

		const stage = this.transformer.getStage();
		const rectangle = stage.findOne(".label");
		this.transformer.attachTo(rectangle);
		this.transformer.getLayer().batchDraw();
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
			<div className="container-fluid p-0">
				<div className="row m-0">
					<div className="col-2 details pt-5 pl-1">
				NAME : {image.name}<br/><br/>
				HEIGHT : {this.state.height}<br/><br/>
				WIDTH : {this.state.width}<br/><br/>
						<hr/>
				LABEL : <input
							className="Label"
							placeholder="Label"
							value={image.label||' '}
							onChange={e => {
								let imageCopy = JSON.parse(JSON.stringify(this.state.image))
								//make changes to ingredients
								imageCopy.label= e.target.value; //whatever new ingredients are
								this.setState({
									image: imageCopy
								});
							}}
							autoFocus/><br/><br/>
				COORDINATES : ({image.x},{image.y})<br/><br/>
				LABEL HEIGHT : {image.height}<br/><br/>
				LABEL WIDTH : {image.width}<br/><br/>
						<div className="button mt-2 p-0 m-0 row justify-content-center">
							<button type="submit" className="btn p-1"  onClick={this.handleSubmit}>Done</button>
						</div>
					</div>
					<div className="col-10">
						<h6 className="font-italic text-muted">Note: Drag the rectangle to mark the area</h6>
						<div className="row justify-content-center">
							<img ref="image" onLoad={this.onImgLoad} src={this.state.url+'uploads/'+image.name} alt={image.name} style={{position:'absolute',zIndex:'-1'}}/>
							<Stage height={this.state.height} width={this.state.width} style={{cursor:this.state.isHovered?'crosshair':'unset'}} >
								<Layer>
									<Rect
										name="label"
										x={image.x||this.state.width/2}
										y={image.y||this.state.height/2}
										width={image.width||50}
										height={image.height||50}
										draggable
										onMouseOver={()=>{this.setState({isHovered:true})}}
										onMouseOut={()=>{this.setState({isHovered:false})}}
										onDragStart={() => {
											this.setState({
												isDragging: true
											});
										}}
										onDragEnd={e => {
											let imageCopy = JSON.parse(JSON.stringify(this.state.image))
											//make changes to ingredients
											imageCopy.x= Math.round(e.target.x());
											imageCopy.y= Math.round(e.target.y()) //whatever new ingredients are
											this.setState({
												isDragging: false,
												image: imageCopy
											});
										}}
										onTransform={e=>{
											var temp=e.currentTarget.attrs;
											let imageCopy = JSON.parse(JSON.stringify(this.state.image));
											imageCopy.width= Math.round((temp.width)*(temp.scaleX));
											imageCopy.height= Math.round((temp.height)*(temp.scaleY));
											this.setState({
												isDragging: false,
												image: imageCopy
											});
										}}
									/>
									<Transformer
										ref={node => {
											this.transformer = node;
										}}
										rotateEnabled={false}
									/>
								</Layer>
							</Stage>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
