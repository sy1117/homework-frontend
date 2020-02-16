import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { PopupMode } from '../../types';
import { PopupProvider } from '../../context/PopupContext';
import { EventProvider } from '../../context/EventContext';
import { ViewProvider } from '../../context/ViewContext';
import Weekly from './index';
import App from '../App'

describe('<Weekly />', () => {
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

        // weekly 모드 전환 
        wrapper.find("[data-testid='btn-weekly']").at(0).simulate('click')


        // data binding
        expect(wrapper.find('.popup').exists()).toBeFalsy()
        wrapper.find(".weekly td.day").at(0).simulate('click');
        
        expect(wrapper.find('.popup').exists()).toBeTruthy()
    });

})      