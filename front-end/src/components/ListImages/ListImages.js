import React, { Component } from "react";
import request from "superagent";
import './ListImages.css';
export default class ListImages extends Component {
	constructor(props) {
		super(props);
		this.state = { Images: [], url:"http://localhost:5000" ,search_label:'',FilteredImages:[] };
		this._isMounted = false;
		this.fetch= this.fetch.bind(this);
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
					data.sort(function(b, a){
						return a.id-b.id
					})
					this._isMounted &&(
						this.setState({
							Images:data,
							FilteredImages:data
						}))
				}))
	}

	handleSubmit(e) {
		e.preventDefault();
		var Images = this.state.Images;
		var query= ' '+this.state.search_label;
		if(query===' ')
			return this.setState({
				FilteredImages:Images
			})
		var FilteredImages = Images.filter(function(Image) {
			return Image.label===null?false:(Image.label).toLowerCase()===(query).toLowerCase();
		});

		this.setState({
			FilteredImages:FilteredImages
		})
		console.log(FilteredImages);
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
										onChange={(e)=>{
											this.setState({
												search_label: e.target.value
											});}}/>
									<button onClick={(e)=>this.handleSubmit(e)} type="button"><i className="fa fa-search"></i></button>
								</div>
							</div>
							<button className="p-1 refreshButton" data-toggle="tooltip" title="refresh" onClick={ ()=> { this.fetch() }}><i className="fas fa-sync-alt"></i></button>
						</div>
					</div>
					<div className="row justify-content-start m-0 pt-3 pl-5 pr-5">
						{this.state.FilteredImages.map((image, i) => {
							return(
								<div className="col-lg-3 col-4 mt-1 p-1" key={image.id}>
									<a href={"/"+image.id}>
										<div className="hovereffect">
											<img className="img-responsive" src={this.state.url+'/uploads/'+image.name}/>
											<div className="overlay">
												<h2>
													<a href={"/"+image.id}><i className="far fa-eye fa-2x"></i></a>
												</h2>
											</div>
										</div>
									</a>
								</div>
							);
						})}

					</div>
				</div>
			</div>
		)
	}
}
