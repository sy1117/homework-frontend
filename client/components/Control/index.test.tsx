import React from 'react';
import { shallow, mount, render} from 'enzyme';
import EventItem from './index';
import ControlPresenter from './ControlPresenter';
import { ViewType, MonthList } from '../../types';
import { fireEvent } from '@testing-library/react';
import { ViewProvider, ViewContext } from '../../context/ViewContext';
import ControlContainer from './ControlContainer';
import { getWeek, yyyymmdd } from '../../utils/Date';

describe('<Control />', () => {
    it('"월" 달력일 경우,', () => {
        const wrapper = mount(
            <ViewProvider>
                <ControlContainer/>
            </ViewProvider>
        );
        expect(wrapper.find("[data-testid='btn-monthly']").prop('disabled')).toEqual(true);
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(false);

        // "주" 버튼 클릭 후, "월" 버튼 활성화 & "주" 버튼의 비활성화
        wrapper.find("[data-testid='btn-weekly']").at(0).simulate('click')
        expect(wrapper.find("[data-testid='btn-monthly']").prop('disabled')).toEqual(false);
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(true);

    })

    it('이전/다음 달로의 이동', () => {
        const currentDate = new Date();
        const wrapper = mount(
            <ViewProvider>
                <ControlContainer/>
            </ViewProvider>
        );
        let prevMonth = new Date()
        prevMonth.setMonth(currentDate.getMonth()-1)
        expect(wrapper.find("[data-testid='span-current-month']").text()).toEqual(MonthList[currentDate.getMonth()])
        wrapper.find("[data-testid='btn-prev']").at(0).simulate('click')
        expect(wrapper.find("[data-testid='span-current-month']").text()).toEqual(MonthList[prevMonth.getMonth()])

        // 다음 달
        wrapper.find("[data-testid='btn-next']").at(0).simulate('click')
        expect(wrapper.find("[data-testid='span-current-month']").text()).toEqual(MonthList[currentDate.getMonth()])
    })


    it('이전/다음 주로의 이동', () => {
        const wrapper = mount(
            <ViewProvider>
                <ControlContainer/>
            </ViewProvider>
        );
        const [firstday, lastday] = getWeek(new Date())
        wrapper.find("[data-testid='btn-weekly']").at(0).simulate('click');
        expect(wrapper.find("[data-testid='btn-weekly']").prop('disabled')).toEqual(true);

        // 현재 주
        expect(wrapper.find("[data-testid='span-weekly-startdate']").text()).toEqual(yyyymmdd(firstday))
        expect(wrapper.find("[data-testid='span-weekly-enddate']").text()).toEqual(yyyymmdd(lastday))

        // 이전 주 
        const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
        let sevenDaysAgo = new Date((Date.now()) - SEVEN_DAYS); // 7 days ago
        let [prevFirstday, prevNextday] = getWeek(sevenDaysAgo)
        
        wrapper.find("[data-testid='btn-prev']").at(0).simulate('click')
        expect(wrapper.find("[data-testid='span-weekly-startdate']").text()).toEqual(yyyymmdd(prevFirstday))
        expect(wrapper.find("[data-testid='span-weekly-enddate']").text()).toEqual(yyyymmdd(prevNextday))

        wrapper.find("[data-testid='btn-next']").at(0).simulate('click')
        expect(wrapper.find("[data-testid='span-weekly-startdate']").text()).toEqual(yyyymmdd(firstday))
        expect(wrapper.find("[data-testid='span-weekly-enddate']").text()).toEqual(yyyymmdd(lastday))
    })
})      