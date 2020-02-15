import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PopupPresenter from './PopupPresenter';
import { PopupMode } from '../../types';


describe('<EventPopup />', () => {
    it('컴포넌트 prop 바인딩', () => {
        
        const props = {
            id : 1,
            date: "2020/03/01",
            hours :12,
            title:"meeting"
        }
        const wrapper = mount(
            <PopupPresenter 
                {...props}
            />
        );

        // data binding
        console.log(wrapper.find('#popup_hours').prop('value'))
        expect(wrapper.find('#popup_title').prop('value')).toEqual(props.title)
        expect(wrapper.find('#popup_date').prop('value')).toEqual(props.date)
        expect(wrapper.find('#popup_hours').prop('value')).toEqual(props.hours)

    });

})      