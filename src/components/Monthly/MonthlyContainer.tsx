import React, { useContext } from 'react'
import MonthlyPresenter from './MonthlyPresenter';
import { ViewContext } from '../../context/ViewContext'

const MonthlyContainer:React.SFC = ()=>{
    const { currentDate } = useContext(ViewContext);

    const dropHandler = (e)=>{
        e.preventDefault();
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    return (
        <MonthlyPresenter 
            currentDate={currentDate} 
            onDrop={dropHandler} 
            onDragOver={dragOverHandler}
            />
    )
}

export default MonthlyContainer;