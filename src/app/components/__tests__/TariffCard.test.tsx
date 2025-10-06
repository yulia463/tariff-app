import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TariffCard from '../TariffCard';
import { Tariff } from 'services/api';

const mockTariff: Partial<Tariff> = {
    id: '1',
    period: '1 месяц',
    price: 499,
    full_price: 999,
    text: 'Tariff description',
    is_best: false,
};

describe('TariffCard', () => {
    test('renders with basic data', () => {
        render(<TariffCard tariff={mockTariff as Tariff} />);
        expect(screen.getByText(/1 месяц/i)).toBeInTheDocument();
        expect(screen.getByText(/999 ₽/i)).toBeInTheDocument();
        expect(screen.getByText(/Tariff description/i)).toBeInTheDocument();
    });

    test('shows discount when isDiscountActive and not isFirst', () => {
        render(<TariffCard tariff={mockTariff as Tariff} isDiscountActive />);
        const discountElement = screen.getByText(/-50%/i);
        expect(discountElement).toBeInTheDocument();
    });

    test('shows "hit!" when isFirst and isDiscountActive', () => {
        render(<TariffCard tariff={mockTariff as Tariff} isDiscountActive isFirst />);
        const hitElement = screen.getByText(/хит!/i);
        expect(hitElement).toBeInTheDocument();
    });

    test('changes border when selected', () => {
        const { container } = render(<TariffCard tariff={mockTariff as Tariff} selected />);
        expect(container.firstChild).toHaveClass('border-yellow');
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<TariffCard tariff={mockTariff as Tariff} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
