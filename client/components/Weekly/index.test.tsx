import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { PopupMode } from '../../types';
import { PopupProvider } from '../../context/PopupContext';
import { EventProvider } from '../../context/EventContext';
import { ViewProvider } from '../../context/ViewContext';
import Weekly from './index';
import App from '../App'
import { yyyymmdd } from '../../utils/Date';

describe('<Weekly />', () => {
    it('시간 cell 클릭 시, 팝업 오픈', () => {
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
        wrapper.find("[data-testid='btn-weekly']").simulate('click')

        // data binding
        expect(wrapper.find('.popup').exists()).toBeFalsy()
        wrapper.find(".weekly td.time").at(0).simulate('click');
        expect(wrapper.find('.popup').exists()).toBeTruthy()


        const day =  wrapper.find("td.time").at(0);
        let clickedYear = day.prop('data-year');
        let clickedMonth = day.prop('data-month');
        let clickedDate= day.prop('data-date')
        let clickedHour = day.prop('data-hours')

        day.simulate('click');
        
        expect(wrapper.find('.popup').exists()).toBeTruthy()
        expect(wrapper.find('#popup_date').prop('value')).toEqual(yyyymmdd(new Date(clickedYear, clickedMonth, clickedDate)))
        expect(wrapper.find('#popup_hours').prop('value')).toEqual(parseInt(clickedHour))
    });

})      