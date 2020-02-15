import React from 'react';
import ReactDOM from 'react-dom'
import Control from './index';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Control />, div);
});