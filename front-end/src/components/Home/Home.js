import React, { Component } from "react";
import Dropzone from "../Dropzone/Dropzone"
import ListImages from "../ListImages/ListImages"
import './Home.css'
export default class Home extends Component {
	render() {
		return(
			<div className="container-fluid Home m-0 mt-2 p-0">
				<div className="row m-3 p-0">
					<div className=" col-12 col-lg-6">
						<Dropzone/>
					</div>
					<div className="col-12 col-lg-6">
						<ListImages/>
					</div>
				</div>
			</div>
		)
	}
}
