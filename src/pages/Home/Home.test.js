import * as React from 'react';
import { mount } from 'enzyme';

import Home from './Home';

describe('Home page', () => {
    it('renders without crashing', () => {
        mount(<Home />);
    })
})
