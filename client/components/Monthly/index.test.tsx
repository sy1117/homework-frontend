import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { PopupMode } from '../../types';
import { PopupProvider } from '../../context/PopupContext';
import { EventProvider } from '../../context/EventContext';
import { ViewProvider } from '../../context/ViewContext';
import Monthly from './index';
import App from '../App'

describe('<Monthly />', () => {
    it('날짜 cell 클릭 시, 팝업 오픈', () => {
        const wrapper = mount(
            <PopupProvider>
                <EventProvider>
                    <ViewProvider>
                        <App/>
                    </ViewProvider>
                </EventProvider>
            </PopupProvider>
        );

        // data binding
        expect(wrapper.find('.popup').exists()).toBeFalsy()
        wrapper.find("td.day").at(0).simulate('click');
        
        expect(wrapper.find('.popup').exists()).toBeTruthy()
        // expect(wrapper.find('#popup_hours').prop('value')).toEqual(props.hours)
    });

})      