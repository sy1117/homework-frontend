import React, { useState } from 'react'
import { PopupMode } from '../types'
import EventPopup from '../components/EventPopup';

export const PopupContext = React.createContext({
    isShown : false,
    data : {},
    close : ()=>{},
    open: (popupData:any)=>{},
});

export const PopupProvider:React.SFC = ({children})=>{
    const [isShown, setShown] = useState(false);
    const [data, setData] = useState({});
    const close = ()=>{setShown(false)}
    const open = (paramData:any)=>{
        setData(paramData);
        setShown(true);
    }
    const toggle = ()=>{
        setShown(!isShown)
    }

    let value = { 
        isShown, 
        data, 
        close, open, toggle
    }

    return (
        <PopupContext.Provider value={value}>
            {children}
        </PopupContext.Provider>
    )
}