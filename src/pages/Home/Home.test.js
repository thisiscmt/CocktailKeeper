import {render, screen} from '@testing-library/react';

import Home from './Home';

test('Home page', () => {
    render(<Home />);

    expect(screen.getByTestId('HomeMainContainer')).toBeInTheDocument();
});
