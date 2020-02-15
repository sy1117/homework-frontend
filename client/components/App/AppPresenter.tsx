import React from 'react'
import { ViewType } from '../../types'
import Control from '../Control'
import EventPopup from '../EventPopup'

interface IProps {
    viewType : ViewType,
    popupShown: boolean
}

const AppPresenter : React.SFC<IProps>= ({viewType, popupShown})=>{

    return (
    <div>
        <Control/>
        {popupShown && <EventPopup/>}
    </div>
    )
}
    
    
export default AppPresenter;