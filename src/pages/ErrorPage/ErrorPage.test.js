import {render, screen} from '@testing-library/react';

import ErrorPage from './ErrorPage';

test('Error page', () => {
    render(<ErrorPage />);

    expect(screen.getByTestId('ErrorMainContainer')).toBeInTheDocument();
});
