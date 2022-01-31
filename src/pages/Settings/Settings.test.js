import {render, screen} from '@testing-library/react';

import Settings from './Settings';

test('Settings page', () => {
    render(<Settings />);

    expect(screen.getByTestId('SettingsDefaultUnit')).toBeInTheDocument();
});
