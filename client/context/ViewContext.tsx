import React, { useState } from 'react'
import { ViewType } from '../types'

export const ViewContext = React.createContext({
    currentDate : new Date(),
    viewType : ViewType.MONTHLY,
    changeView : ()=>{},
    changeDate: (date:Date):void=>{},
    isMonthlyView : ()=>{}
});

export const ViewProvider:React.SFC = ({children})=>{
    /**
     * View Context 
     */
    const [viewType, setView] = useState(ViewType.MONTHLY);
    const [currentDate, setCurrentDate] = useState(new Date());
    const changeView = ()=>{
        setCurrentDate(new Date());
        setView(viewType === ViewType.MONTHLY ? ViewType.WEEKLY : ViewType.MONTHLY)
    }
    const changeDate= (date:any)=>setCurrentDate(date)
    let value:any= { currentDate, viewType, changeView, changeDate };

    return (
        <ViewContext.Provider value={value}>
            {children}
        </ViewContext.Provider>
    )
}
