import React, { useState } from 'react';
import { PopupMode } from '../../types'
import { yyyymmdd } from '../../utils/Date';

interface IProps {
    isShown ?: boolean,
    mode ?: PopupMode,
    data ?: any,
    errorMessage ?: string,
    onCancel ?: Function,
    onSave ?: Function,
    onDelete ?: Function,
    onDataChange ?: Function,
}

const PopupPresenter : React.SFC<IProps> = ({
    id,
    title,
    date,
    hours,
    errorMessage,
    onCancel,
    onDelete,
    onSave,
    onDataChange,
})=>{

    const [formData, setFormData] = useState({
        id,
        title,
        date,
        hours,
    });


    const updateField = (e :React.SyntheticEvent)=> {
        if(onDataChange) onDataChange(e);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handler = (handlerFunc:Function|undefined) => (e:React.SyntheticEvent)=>{
        if(handlerFunc) handlerFunc(e, formData);
    }
    

    return (
        <div className={'popup'}>  
            <div className='popup_inner'>  
                <div>
                    <label htmlFor="popup_title">타이틀</label>
                    <input 
                        type={"text"} 
                        id={"popup_title"} 
                        name={"title"} 
                        value={formData.title}
                        onChange={updateField}
                        size={"50"}/><br/>

                    <label htmlFor="popup_date">날짜</label>
                    <input 
                        type={"date"} 
                        id={"popup_date"} 
                        onChange={updateField}
                        name={"date"} 
                        value={formData.date}/>
                        
                    <br/><br/>

                    <label htmlFor="popup_time">시간</label>
                    <input 
                        type={"number"}
                        id={"popup_hour"}  
                        name={"hours"} 
                        onChange={updateField}
                        value={formData.hours}
                        max={23} min={0}/>:00
                    <br/><br/>
                    {errorMessage && <div>{errorMessage}</div>}

                    <button onClick={handler(onCancel)}>취소</button>
                    { id && <button onClick={handler(onDelete)}>삭제</button>}
                    <button onClick={handler(onSave)}>저장</button>
                </div>
            </div>  
        </div>  
    )
}

export default PopupPresenter;