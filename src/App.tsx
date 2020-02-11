import React, { useState } from 'react';
import ControlView from './components/ControlView';
import WeeklyView from './components/WeeklyView';
import MonthlyView from './Components/MonthlyView';
import './App.css'
import { ViewType, MonthList } from './types';
import { getWeek, yyyymmdd } from './utils/Date';

const App = () => {
	const now = new Date();
	const DEFAULT_VIEW = ViewType.MONTHLY;
	
	const [currentView, setCurrentView] = useState(DEFAULT_VIEW);
	const [currentDate, setDate] = useState({
		date : now.getDate(),
		month : now.getMonth(),
		year : now.getFullYear(),
	})
	let { year, month, date } = currentDate;
	let [ firstday, lastday ] = getWeek(new Date(year,month,date));


	const isMonthlyView = ()=>{
		return currentView === ViewType.MONTHLY
	}

	const toggleView = ()=>{
		currentView === ViewType.MONTHLY
			? setCurrentView(ViewType.WEEKLY)
			: setCurrentView(ViewType.MONTHLY)
	}

	const prevHandler = ()=>{
		if(isMonthlyView()){
			if(month === 0) {
				setDate({
					...currentDate,
					month : 11 ,
					year : year-1
				})
			}else{
				setDate({
					...currentDate,
					month : month-1,
				})
			}
		}else{
			const { year, month, date } = currentDate;
			let temp = new Date(year, month, date);
			let sevenDaysAgo = new Date(temp - 1000 * 60 * 60 * 24 * 7); // 7 days ago
			setDate({
				year : sevenDaysAgo.getFullYear(),
				month : sevenDaysAgo.getMonth(),
				date : sevenDaysAgo.getDate(),
			})
		}
	}

	const nextHandler = ()=>{
		if(isMonthlyView()){
			if(month === 11) {
				setDate({
					...currentDate,
					month : 0,
					year : year+1,
				})
			}else{
				setDate({
					...currentDate,
					month : month+1,
				})
			}
		}else{
			let afterSevenDays = new Date(year, month, date);
			afterSevenDays.setDate(afterSevenDays.getDate() + 7);
			setDate({
				year : afterSevenDays.getFullYear(),
				month : afterSevenDays.getMonth(),
				date : afterSevenDays.getDate(),
			})
		}
	}
	
	return (
    <div>
		<table id={"calendar"}>
			<caption>
				<button onClick={prevHandler}>&lt;</button>
				{
					isMonthlyView()
						?`${MonthList[month]} ${year}`
						: `${yyyymmdd(firstday)} ~ ${yyyymmdd(lastday)}`
				}
				<button onClick={nextHandler}>&gt;</button>
				<button onClick={toggleView} disabled={isMonthlyView()}>월</button>
				<button onClick={toggleView} disabled={!isMonthlyView()}>주</button>
			</caption>
			{isMonthlyView() 
				? <MonthlyView year={year} month={month} /> 
				: <WeeklyView year={year} month={month} date={date}/>
			}
		</table>
    </div>
  	)
}

export default App;
