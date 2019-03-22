import React, { Component } from "react";
import request from "superagent";
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './ListImages.css';
export default class ListImages extends Component {
	constructor(props) {
		super(props);
		this.state = { Images: [], url:"http://localhost:5000" ,search_label:'',FilteredImages:[] };
		this._isMounted = false;
		this.fetch= this.fetch.bind(this);
		this.fetchQuery= this.fetchQuery.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetch();
	}

	fetch() {
		this._isMounted && (
			request
				.get(this.state.url)
				.query(null)
				.set('Accept', 'application/json')
				.end ((error, response)=>{
					if(error) {console.log(error);return;}
					const data=response.body;
					this._isMounted &&(
						this.setState({
							Images:data,
							FilteredImages:data
						}))
				}))
	}

	fetchQuery() {
		this._isMounted && (
			request
				.get(this.state.url+'/labels')
				.query({
					"q":this.state.search_label
				})
				.set('Accept', 'application/json')
				.end ((error, response)=>{
					if(error) {console.log(error);return;}
					const data = response.body;
					const FilteredImages = [],Images = this.state.Images;
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < Images.length; j++) {
							if(Images[j].ID===data[i])
								FilteredImages.push(Images[i])
						}
					}
					this.setState({
						FilteredImages:FilteredImages
					})
					if(FilteredImages.length===0)
						this.setState({
							NoImageFound:true
						})
				}))
	}

	handleSubmit(e) {
		e.preventDefault();
		var Images = this.state.Images;
		var query= this.state.search_label;
		if(query==='')
			return this.setState({
				FilteredImages:Images,
				NoImageFound:false
			})
		this.fetchQuery();
	}

	componentWillUnmount(){this._isMounted = false;}

	render() {
		return(
			<div id="ListImages">
				<div className="container p-0">
					<div className="row m-0 pl-5 pr-3 pt-3 pb-3">
						<div className="d-flex w-100">
							<h2 className="m-0 align-self-center mr-auto">GALLERY</h2>
							<div className="col-4 mr-2">
								<div className="searchQueryForm">
									<input
										type="search"
										name="query"
										value={this.state.search_label}
										onKeyDown = {(e)=>{
											if(e.keyCode == 13){
												this.handleSubmit(e)
											}
										}}
										onChange={(e)=>{
											this.setState({
												search_label: e.target.value
											});}}/>
									<Fab color="secondary" size="small" aria-label="Add" data-toggle="tooltip" title="search"  onClick={(e)=>this.handleSubmit(e)}  className="ml-1 searchButton"><SearchIcon /></Fab>
								</div>
							</div>
							<Fab color="secondary" size="small" aria-label="Add" data-toggle="tooltip" title="refresh" onClick={ ()=> { this.fetch() }} className="ml-3 refreshButton"><RefreshIcon /></Fab>
						</div>
					</div>
					<div className="row justify-content-start m-0 pt-3 pl-5 pr-5">
						<GridList cellHeight={140} cols={4}>
							{this.state.NoImageFound&&(<GridListTile cols={3}>
								<h5 style={{color:'var(--color2)'}}>No matching results found :-( </h5>
							</GridListTile>)}
							{this.state.FilteredImages.map((image, i) => (
								<GridListTile key={image.ID} cols={1}>
									<a href={"/"+image.ID}>
										<div className="hovereffect">
											<img className="img-responsive" src={this.state.url+'/uploads/'+image.Name}/>
											<div className="overlay">
												<h2>
													<i className="far fa-eye fa-2x"></i>
												</h2>
											</div>
										</div>
									</a>
								</GridListTile>
							))}
						</GridList>
					</div>
				</div>
			</div>
		)
	}
}
