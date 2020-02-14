import React, { useState, useContext, useEffect } from 'react'
import AppPresenter from './AppPresenter'
import { ViewContext } from '../../context/ViewContext'
import { EventContext, getEvents } from '../../context/EventContext'
import { ViewType } from '../../types'
import { PopupContext } from '../../context/PopupContext'


const AppContainer: React.SFC = ()=>{

    const { viewType } = useContext(ViewContext);
    const { event, dispatch } = useContext(EventContext);
    const { isShown } = useContext(PopupContext)

    useEffect(async ():Promise<any> => {
        await getEvents(dispatch)
    }, [dispatch])

    /**
     * Event Context
     */    
	return (
        <AppPresenter viewType={viewType} popupShown={isShown}/>
    )
}

export default AppContainer;