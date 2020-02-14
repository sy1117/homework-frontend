import React, { useState } from 'react';
import './App.css'
import { ViewProvider } from './context/ViewContext'
import { EventProvider } from './context/EventContext'
import App from './components/App'
import { ViewType } from './types'
import { PopupProvider } from './context/PopupContext';

const _App:React.SFC = ()=>{

	return (
		<ViewProvider>
			<EventProvider>
				<PopupProvider>
					<App/>
				</PopupProvider>
			</EventProvider>
		</ViewProvider>
	)
}

export default _App;
