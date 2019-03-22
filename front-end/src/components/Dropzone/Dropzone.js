import React, { Component } from "react";
import DropzoneComponent from 'react-dropzone-component';
import Paper from '@material-ui/core/Paper';
import './Dropzone.css'
export default class Dropzone extends Component {
	constructor(props) {
		super(props);
		// For a full list of possible configurations,
		// please consult http://www.dropzonejs.com/#configuration
		this.djsConfig = {
			acceptedFiles: "image/jpeg,image/png,image/gif",
			autoProcessQueue: true,
			resizeWidth: 1000, resizeHeight: 600,
			resizeMethod: 'contain', resizeQuality: 1.0,
		};

		this.componentConfig = {
			iconFiletypes: ['.jpg', '.png', '.gif'],
			showFiletypeIcon: true,
			/*ADD URL OF THE BACKEND HERE*/
			postUrl: 'http://localhost:5000'
		}
	}

	success (file, path){
		// console.log(file,path);
		Notification.requestPermission();
		if(Notification.permission === 'granted') {
			new Notification('File uploaded successfully');
		}
	}

	render() {
		const config = this.componentConfig;
		const djsConfig = this.djsConfig;
		const eventHandlers = {
			success: (file,path) => this.success(file, path)
		};

		return ( <Paper elevation={8}><DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} /></Paper>)
	}
}
