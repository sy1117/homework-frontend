import React , { useContext } from 'react'
import { ViewContext } from '../../context/ViewContext'
import ControlPresenter from './ControlPresenter'

const ControlContainer = ()=>{

    const { viewType, currentDate, changeView, changeDate } = useContext(ViewContext);

    return (
        <ControlPresenter {...{ viewType, currentDate, changeView, changeDate }} />
    )

}

export default ControlContainer