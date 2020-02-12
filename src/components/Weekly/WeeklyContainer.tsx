import React, { useContext } from 'react'
import WeeklyPresenter from './WeeklyPresenter'
import { ViewContext } from '../../context/ViewContext'

const WeeklyContainer = ()=>{
    const { currentDate } = useContext(ViewContext);

    const dropHandler = (e)=>{
        e.preventDefault();
        console.log("drop", e.dataTransfer.getData("text"));
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    return <WeeklyPresenter currentDate = {currentDate} onDragOver={dragOverHandler} onDrop={dropHandler}/>
}

export default WeeklyContainer