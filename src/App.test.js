import { render, screen } from '@testing-library/react';

import App from './App';

describe('Main app', () => {
    test('Render the component', () => {
        render(<App />);

        expect(screen.getByTestId('AppMainPaper')).toBeInTheDocument();
    });
})
