import * as React from 'react';
import { mount } from 'enzyme';

import ViewRecipe from './ViewRecipe';

describe('View recipe page', () => {
    it('renders without crashing', () => {
        const match = {
            params: {}
        };

        mount(<ViewRecipe.WrappedComponent match={ match } />);
    })
})
