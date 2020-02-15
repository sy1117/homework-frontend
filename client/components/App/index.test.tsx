// Link.react.test.js
import React from 'react';
import ReactDOM from 'react-dom'
import App from './index';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});