import * as React from 'react';
import { mount } from 'enzyme';

import EditRecipe from './EditRecipe';

describe('Edit recipe page', () => {
    it('renders without crashing', () => {
        const match = {
            params: {}
        };

        mount(<EditRecipe.WrappedComponent match={ match } />);
    })
})
