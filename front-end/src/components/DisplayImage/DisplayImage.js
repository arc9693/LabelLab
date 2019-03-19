import React, { Component } from 'react';
import request from "superagent";
import './DisplayImage.css'
export default class DisplayImage extends Component {
	constructor(props) {
		super(props);
		this.state = { url:"http://localhost:5000/",id:this.props.match.params.id,image:{} };
		this.routeChange = this.routeChange.bind(this);
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
				//console.log(JSON.stringify(data));
				this.setState({
					image:data[0]
				})
			})
		const canvas = this.refs.canvas
		const ctx = canvas.getContext("2d")
		const img = this.refs.image
		img.onload = () => {
			this.setState({
				width: img.width,
				height: img.height,
			});
			ctx.filter='blur(0.01px)'
			ctx.drawImage(img, 0, 0)
			// console.log(ctx);
			ctx.strokeStyle="#FFF"
			ctx.lineWidth='2'
			ctx.filter='none'
			ctx.strokeRect(this.state.image.x,this.state.image.y,this.state.image.width,this.state.image.height)
			ctx.font = "1rem  Arial";
			ctx.fillStyle = "#fff";
			if(this.state.image.has_label==='true')
				ctx.fillText(this.state.image.label,this.state.image.x,this.state.image.y+this.state.image.height+16);
		}
	}


	routeChange() {
		let path = `/label/`+this.state.id;
		this.props.history.push(path);
	}

	render() {
		var {image}=this.state;
		return (
			<div className="container-fluid p-0">
				<div className="row m-0">
					<div className="col-2 details pt-5 pl-1">
						<h6>NAME :<br/> {image.name}</h6>
						<h6>HEIGHT : {this.state.height}</h6>
						<h6>WIDTH : {this.state.width}</h6>
						{image.has_label==='true'&&(<div>	<hr/>
							<h6>LABEL : {image.label}</h6>
							<h6>COORDINATES : ({image.x},{image.y})</h6>
							<h6>LABEL HEIGHT : {image.height}</h6>
							<h6>LABEL WIDTH : {image.width}</h6></div>)}
						<div className="button mt-2 p-0 m-0 row justify-content-center">
							{image.has_label==='false'&&(<button className="btn p-1" onClick={this.routeChange}>Add label</button>)}
							{image.has_label==='true'&&(<button className="btn p-1" onClick={this.routeChange}>Edit label</button>)}
						</div>
					</div>
					<div className="col-10">
						<div className="row justify-content-center p-3">
							<canvas ref="canvas" height={this.state.height} width={this.state.width}>
								<img ref="image" onLoad={this.onImgLoad} src={this.state.url+'uploads/'+image.name} alt={image.name}/>
							</canvas>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
