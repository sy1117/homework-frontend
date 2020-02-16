import React from 'react';
import { shallow, mount } from 'enzyme';
import EventItem from './index';

describe('<EventItem />', () => {
	it('data mapping', () => {
		const data = {
			"id" : 2,
			"title" :"meeting",
			"datetime" :"2020-02-01T17:00:00.000Z",
			"createdAt" : "2020-02-01T15:00:00.000Z"
		}
		const wrapper = mount(<EventItem data = {data}/>);
		expect(wrapper.find('.event-time').text()).toEqual('2시')
		expect(wrapper.find('.event-desc').text()).toEqual("meeting")
	});
})      