import * as React from 'react';
import { mount } from 'enzyme';

import Settings from './Settings';

describe('Settings page', () => {
    it('renders without crashing', () => {
        mount(<Settings />);
    })
})
