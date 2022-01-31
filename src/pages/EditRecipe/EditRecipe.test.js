import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import EditRecipe from './EditRecipe';

test('Edit recipe page', () => {
    render(
        <MemoryRouter initialEntries={['recipe', 'recipe/somedrink/edit']}>
            <Route path={['/recipe', '/recipe/:recipeName/edit']}>
                <EditRecipe />
            </Route>
        </MemoryRouter>
    );
});
