import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
    it('renders the logo and title correctly', () => {
        render(<Header />);

        // Check if the logo image is rendered
        const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();

        // Check if the title "Electricity Prices" is rendered
        const title = screen.getByText('Electricity Prices');
        expect(title).toBeInTheDocument();
    });
});
