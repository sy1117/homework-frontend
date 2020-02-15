import React from 'react'
import { ViewType } from '../../types'
import Control from '../Control'
import Monthly from '../Monthly'
import Weekly from '../Weekly'
import EventPopup from '../EventPopup'

interface IProps {
    viewType : ViewType,
    popupShown: boolean
}

const AppPresenter : React.SFC<IProps>= ({viewType, popupShown})=>{

    return (
    <div>
        <table id={"calendar"}>
            <Control/>
            {viewType === ViewType.MONTHLY ? <Monthly/> : <Weekly/>}
        </table>
        {popupShown && <EventPopup/>}
    </div>
    )
}
    
    
export default AppPresenter;