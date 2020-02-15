import React, { useState, useRef } from 'react';
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

    const formRef = useRef<HTMLFormElement>();
    const saveButtonRef = useRef<HTMLFormElement>();

    const updateField = (e :React.SyntheticEvent)=> {
        if(onDataChange) onDataChange(e);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handler = (action:'CANCEL'|'DELETE'|'SAVE', handlerFunc:Function|undefined) => (e:React.SyntheticEvent)=>{
        e.preventDefault();
        if(action === 'SAVE' && !formRef.current.checkValidity()) return false;
        if(handlerFunc) handlerFunc(e, formData);
    }

    return (
        <form className={'popup'} ref={formRef}>  
            <div className='popup_inner'>  
                <div>
                    <h1>{ id ? "일정 수정" : "새 일정"}</h1>
                    <label htmlFor="popup_title">제목</label><br/>
                    <input 
                        type={"text"} 
                        id={"popup_title"} 
                        name={"title"} 
                        value={formData.title}
                        onChange={updateField}
                        required
                        size={"50"}/><br/>

                    <div>
                        <label htmlFor="popup_date">날짜 및 시간</label>
                    </div>
                    <div>
                        <input 
                            type={"date"} 
                            id={"popup_date"} 
                            onChange={updateField}
                            name={"date"} 
                            value={formData.date}
                            required
                            />
                        <select
                            name={"hours"} 
                            onChange={updateField}
                            value={formData.hours}>
                            {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                                .map(item=>
                                    // <option value={item}>{item%12===0? item:item%12}</option>
                                    <option value={item}>{item}</option>
                                )
                            }
                        </select>
                        ~ {(parseInt(formData.hours)+1) 시
                    </div>
                    <div>
                        {errorMessage && {errorMessage}}
                    </div>
                    <div className="popup_btn_area">
                        <button onClick={handler('CANCEL', onCancel)}>취소</button>
                        { id && <button onClick={handler('DELETE',onDelete)}>삭제</button>}
                        <button onClick={handler('SAVE', onSave)}>저장</button>
                    </div>
                </div>
            </div>  
        </form>  
    )
}

export default PopupPresenter;