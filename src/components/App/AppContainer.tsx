import React, { useState, useContext, useEffect } from 'react'
import AppPresenter from './AppPresenter'
import { ViewContext } from '../../context/ViewContext'
import { EventContext, getEvents } from '../../context/EventContext'
import { ViewType } from '../../types'


const AppContainer = ()=>{

    const { viewType } = useContext(ViewContext);
    const { event, dispatch } = useContext(EventContext)

    useEffect(async() => {
        await getEvents(dispatch)
    }, [dispatch])

    console.log(event)

    /**
     * Event Context
     */    
	return (
        <AppPresenter viewType={viewType}/>
    )
}

export default AppContainer;