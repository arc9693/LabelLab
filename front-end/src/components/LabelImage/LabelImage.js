import React, { Component } from 'react';
import request from "superagent";
import { Stage, Layer, Rect,Transformer,Group,Text } from 'react-konva';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import './LabelImage.css'
export default class LabelImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url:"http://localhost:5000/",
			id:this.props.match.params.id,
			image:{},
			labels:[],
			newlabel:{x:0,y:0,height:0,width:0,Label:'',ImageID:this.props.match.params.id},
			isDragging: false,
			isHovered:false,
			isDrawing:false
		};
		this.fetch= this.fetch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancel = this.cancel.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	componentDidMount() {
		this.fetch();
		const stage = this.transformer.getStage();
		const rectangle = stage.findOne(".label");
		this.transformer.attachTo(rectangle);
		this.transformer.getLayer().batchDraw();
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
			})
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.newlabel.Label==='') return alert("Please enter a label!");
		if(this.state.newlabel.x===0&&this.state.newlabel.y===0&&this.state.newlabel.height===0&&this.state.newlabel.width===0)  return alert("Please mark the bounding rectangle!");
		console.log(this.state.newlabel);
		request
			.post(this.state.url+this.props.match.params.id+'/labels/add')
			.set('Content-Type', 'application/json')
			.send(this.state.newlabel)
			.set('Accept', 'application/json')
			.end ((error, response)=>{
				if(error) {console.log(error);return;}
				let path = `/`+this.state.id;
				this.props.history.push(path);
			})
	}

	cancel(e) {
		let path = `/`+this.state.id;
		this.props.history.push(path);
	}

	refresh (e) {
		this.fetch()
		this.setState({
			isDragging: false,
			isHovered:false,
			isDrawing:false,
			newlabel:{x:0,y:0,height:0,width:0,Label:'',ImageID:this.props.match.params.id},
		})
	}

	render() {
		var {image,labels,newlabel}=this.state;
		return (
			<div className="container-fluid p-0" id="LabelImage">
				<div className="row m-0">
					<div className="col-12 col-sm-2 details pt-5 pl-1">
						<h6>NAME : {image.Name}</h6><Divider/>
						<h6>HEIGHT : {image.height}</h6><Divider/>
						<h6>WIDTH : {image.width}</h6><Divider/>
						<div>
							<h6 className="mb-0">LABELS : </h6>
							<ul>
								{this.state.labels.map(function(label, index){
									return (<li key={label.ID}>{label.Label}</li>)})}
								<li><input
									className="Label"
									placeholder="Label"
									value={newlabel.Label||' '}
									onChange={e => {
										let newlabelCopy = JSON.parse(JSON.stringify(this.state.newlabel))
										newlabelCopy.Label= e.target.value;
										this.setState({
											newlabel: newlabelCopy
										});
									}}
									autoFocus/>
								</li>
							</ul>
						</div>
						<div className="mt-2 p-0 m-0 row justify-content-center">
							<Fab color="secondary" size="small" data-toggle="tooltip" title="done"  onClick={this.handleSubmit}  className="ml-1 iconbutton"><CheckIcon /></Fab>
							<Fab color="secondary" size="small" data-toggle="tooltip" title="cancel"  onClick={this.cancel}  className="ml-1 iconbutton"><ClearIcon /></Fab>
							<Fab color="secondary" size="small" data-toggle="tooltip" title="reset"  onClick={this.refresh}  className="ml-1 iconbutton"><ReplayIcon /></Fab>
						</div>
					</div>
					<div className="col-12 col-sm-10 canvascontent">
						<h6 className="font-italic text-muted">Note: Click on the image to select an area.</h6>
						<div className="row justify-content-center">
							<img ref="image" src={this.state.url+'uploads/'+image.Name} alt={image.Name} style={{position:'absolute'}}/>
							<Paper elevation={8} style={{height:image.height,width:image.width}}>
								<Stage height={image.height} width={image.width} style={{cursor:this.state.isDragging?'grabbing':(this.state.isHovered?'grab':'crosshair')}}
									onMouseDown={(e)=>{
										var cx=e.evt.offsetX;
										var cy=e.evt.offsetY;
										if((cx>=newlabel.x&&cx<=newlabel.x+newlabel.width)&&(cy>=newlabel.y&&cy<=newlabel.y+newlabel.height))
											this.setState({hasDrawn:true});
										else this.setState({hasDrawn:false});
										if(!this.state.hasDrawn)
										{	let newlabelCopy = JSON.parse(JSON.stringify(this.state.newlabel))
											newlabelCopy.x=cx;
											newlabelCopy.y=cy;
											newlabelCopy.height=0;
											newlabelCopy.width=0;
											this.setState({isDrawing:true,newlabel:newlabelCopy});}
									}}
									onMouseMove={(e)=>{
										if(this.state.isDrawing===true&&!this.state.hasDrawn)
										{ let newlabelCopy = JSON.parse(JSON.stringify(this.state.newlabel))
											newlabelCopy.height=-newlabel.y+e.evt.offsetY;
											newlabelCopy.width=-newlabel.x+e.evt.offsetX;
											this.setState({isDrawing:true,newlabel:newlabelCopy})}
									}}
									onMouseUp={()=>{this.setState({isDrawing:false,hasDrawn:true})}}
								>
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
										<Rect
											name="label"
											x={newlabel.x}
											y={newlabel.y}
											width={newlabel.width}
											height={newlabel.height}
											draggable
											onMouseOver={()=>{this.setState({isHovered:true})}}
											onMouseOut={()=>{this.setState({isHovered:false})}}
											onDragStart={() => {
												this.setState({
													isDragging: true,
													isHovered: false
												});
											}}
											onDragEnd={e => {
												let newlabelCopy = JSON.parse(JSON.stringify(this.state.newlabel))
												newlabelCopy.x= Math.round(e.target.x());
												newlabelCopy.y= Math.round(e.target.y())
												this.setState({
													isDragging: false,
													isHovered: true,
													newlabel: newlabelCopy
												});
											}}
											onTransform={e=>{
												var temp=e.currentTarget.attrs;
												let newlabelCopy = JSON.parse(JSON.stringify(this.state.newlabel));
												newlabelCopy.width= Math.round((temp.width)*(temp.scaleX));
												newlabelCopy.height= Math.round((temp.height)*(temp.scaleY));
												this.setState({
													isDragging: false,
													newlabel: newlabelCopy
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
							</Paper>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
