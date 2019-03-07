import React, { Component } from "react";
import Dropzone from "../Dropzone/Dropzone"
import ListImages from "../ListImages/ListImages"
import './Home.css'
export default class Home extends Component {
	render() {
		return(
			<div className="container Home m-0 mt-2 p-0">
				<div className="row m-0 p-0">
					<div className="col-lg-8 col-12">
						<Dropzone/>
					</div>
					<div className="col-lg-4 col-12">
						<ListImages/>
					</div>
				</div>
			</div>
		)
	}
}
