import * as React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';

import ViewRecipe from './ViewRecipe';

describe('View recipe page', () => {
    it('renders', () => {
        const component = mount(
            <MemoryRouter initialEntries={['recipe/somedrink']}>
                <Route path='/recipe/:recipeName'>
                    <ViewRecipe />
                </Route>
            </MemoryRouter>
        )

        expect(component).toBeTruthy();
    });
});
