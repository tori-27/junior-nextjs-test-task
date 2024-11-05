import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoBackButton from '@/app/components/ui/GoBackButton';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        back: mockBack,
    }),
}));

describe('GoBackButton Component', () => {
    beforeEach(() => {
        mockBack.mockClear();
    });

    it('renders the go back button and calls router.back on click', () => {
        render(<GoBackButton />);

        const button = screen.getByText('Go Back');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(mockBack).toHaveBeenCalled();
    });
});
