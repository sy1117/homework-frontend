import React from 'react';
import { shallow, mount, render} from 'enzyme';
import EventItem from './index';
import ControlPresenter from './ControlPresenter';
import { ViewType } from '../../types';
import { fireEvent } from '@testing-library/react';

describe('<EventItem />', () => {
    it('<Control>', () => {
        const props = {
            viewType: ViewType.MONTHLY, 
            currentDate : new Date(), 
            onChangeView: ()=>{}, 
            onPrevHandler: ()=>{}, 
            onNextHandler: ()=>{}, 
        }
        const wrapper = mount(<ControlPresenter {...props} />);
        expect(wrapper.find("[data-testid='btn-monthly']").prop('disabled')).toEqual(true);
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(false);
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(false);

    })

    it('"주" 달력일 경우, ', () => {
        const props = {
            viewType: ViewType.WEEKLY, 
            currentDate : new Date(), 
            onChangeView: ()=>{}, 
            onPrevHandler: ()=>{}, 
            onNextHandler: ()=>{}, 
        }
        const wrapper = shallow(<ControlPresenter {...props} />);
        expect(wrapper.find("[data-testid='btn-monthly']").prop('disabled')).toEqual(false);
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(true);
    })

})      