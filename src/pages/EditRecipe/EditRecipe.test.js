import * as React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';

import EditRecipe from './EditRecipe';

describe('Edit recipe page', () => {
    it('renders', () => {
        const component = mount(
            <MemoryRouter initialEntries={['recipe', 'recipe/somedrink/edit']}>
                <Route path={['/recipe', '/recipe/:recipeName/edit']}>
                    <EditRecipe />
                </Route>
            </MemoryRouter>
        )

        expect(component).toBeTruthy();
    });
});
