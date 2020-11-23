import * as React from 'react';
import { mount } from 'enzyme';

import ErrorPage from './ErrorPage';

describe('Error page', () => {
    it('renders without crashing', () => {
        mount(<ErrorPage />);
    })
})
