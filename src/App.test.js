import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('Main app', () => {
    it('renders without crashing', () => {
        mount(<App />);
    });
});

