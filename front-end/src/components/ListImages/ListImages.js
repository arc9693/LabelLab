import React, { Component } from "react";
import request from "superagent";
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
				<h2 className="text-center">Your images</h2>
				<div className="conatiner">
					<div className="row">
						{this.state.Images.map((image, i) => {
							return(
								<div className="col-3 p-1" key={image.id}>
									<a href={"/"+image.id} className="text-primary">
										<img src={this.state.url+'/uploads/'+image.name} height="100" width="100%" alt={image.name}/>
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
