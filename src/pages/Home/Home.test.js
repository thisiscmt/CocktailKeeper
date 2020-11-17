import * as React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

describe('Home page', () => {
    it('renders without crashing', () => {
        shallow(<Home />);
    })
})
