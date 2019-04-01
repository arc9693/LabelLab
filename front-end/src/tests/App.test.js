import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import ListImages from '../components/ListImages/ListImages';
import { configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('App component', () => {
	it('renders correctly', () => {
		const component = shallow(<App />);
		expect(component).toMatchSnapshot();
	});
});

describe('ListImages component', () => {
	it('renders correctly', () => {
		const component = shallow(<ListImages />);
		expect(component).toMatchSnapshot();
	});

	it('Lists images or No images message', () => {
		const component = mount(<ListImages/>);
		expect(component.state().search_label).toEqual('');
		expect(component.state().FilteredImages.length > 0||(component.state().FilteredImages.length === 0 && component.find('#NoImagesMessage').text()==="No images uploaded")).toBeTruthy();
	});
});
