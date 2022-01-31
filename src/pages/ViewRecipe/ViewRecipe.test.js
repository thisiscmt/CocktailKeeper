import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import ViewRecipe from './ViewRecipe';

test('View recipe page', () => {
    render(
        <MemoryRouter initialEntries={['recipe/somedrink']}>
            <Route path='/recipe/:recipeName'>
                <ViewRecipe />
            </Route>
        </MemoryRouter>
    );
});
