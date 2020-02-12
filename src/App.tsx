import React, { useState } from 'react';
import './App.css'
import { ViewProvider } from './context/ViewContext'
import { EventProvider } from './context/EventContext'
import App from './components/App'
import { ViewType } from './types'

const _App = ()=>{

	return (
		<ViewProvider>
			<EventProvider>
				<App/>
			</EventProvider>
		</ViewProvider>
	)
}

export default _App;
