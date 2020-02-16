import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { PopupMode } from '../../types';
import { PopupProvider } from '../../context/PopupContext';
import { EventProvider } from '../../context/EventContext';
import { ViewProvider } from '../../context/ViewContext';
import Monthly from './index';
import App from '../App'
import { yyyymmdd } from '../../utils/Date';

describe('<Monthly />', () => {

    it('날짜 칸 클릭 시, 팝업 오픈 및 팝업 데이터 확인', () => {
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
        // expect(wrapper.find('.popup').exists()).toBeFalsy()
        const day =  wrapper.find("td.day").at(0);
        let clickedYear = day.prop('data-year');
        let clickedMonth = day.prop('data-month');
        let clickedDate= day.prop('data-date')

        day.simulate('click');
        
        expect(wrapper.find('.popup').exists()).toBeTruthy()
        expect(wrapper.find('#popup_date').prop('value')).toEqual(yyyymmdd(new Date(clickedYear, clickedMonth, clickedDate)))
    });

})      