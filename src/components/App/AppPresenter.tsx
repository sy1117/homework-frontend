import React from 'react'
import { ViewType } from '../../types'
import Control from '../Control'
import Monthly from '../Monthly'
import Weekly from '../Weekly'

interface IProps {
    viewType : ViewType
}

const AppPresenter : React.SFC<IProps>= ({viewType})=>{

    return (
        <table id={"calendar"}>
            <Control/>
            {viewType === ViewType.MONTHLY ? <Monthly/> : <Weekly/>}
        </table>
    )
}
    
    
export default AppPresenter;