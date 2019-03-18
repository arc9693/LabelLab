import React, { Component } from "react";
import request from "superagent";
import './ListImages.css';
export default class ListImages extends Component {
	constructor(props) {
		super(props);
		this.state = { Images: [], url:"http://localhost:5000"  };
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
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
							Images:data
						}))
				}))
	}

	componentWillUnmount(){this._isMounted = false;}

	render() {
		return(
			<div>
				<h4 className="text-center font-weight-bold border-bottom border-3 pb-3 pt-3">YOUR UPLOADS</h4>
				<div className="container p-0">
					<div className="row justify-content-center ImagesList">
						{this.state.Images.map((image, i) => {
							return(
								<div class="col-lg-3 col-4 mt-2" key={image.id}>
									<div class="hovereffect">
										<img class="img-responsive img-thumbnail" src={this.state.url+'/uploads/'+image.name}/>
										<div class="overlay">
											<h2>
												<a href={"/"+image.id}><i class="far fa-eye fa-2x"></i></a>
											</h2>
										</div>
									</div>
								</div>

							);
						})}

					</div>
				</div>
			</div>
		)
	}
}
