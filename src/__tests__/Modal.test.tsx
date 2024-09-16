import React from 'react';
import '../__mocks__/react-i18next';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../components/Modal/Modal';

const mockOnClose = jest.fn();
const mockOnAddToOrder = jest.fn();
const itemMock = {
  id: 1,
  name: 'Pizza',
  description: 'Delicious pizza',
  price: 20,
  images: [{ id: 1, image: 'image-url.jpg' }],
  modifiers: [
    {
      name: 'Size',
      items: [
        { id: 1, name: 'Small', price: 0, available: true },
        { id: 2, name: 'Large', price: 5, available: true },
      ],
    },
  ],
};

describe('Modal Component', () => {
  test('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={mockOnClose} item={null} onAddToOrder={mockOnAddToOrder} />);
    expect(screen.queryByText('Pizza')).toBeNull();
  });

  test('renders when isOpen is true and item is provided', () => {
    render(<Modal isOpen={true} onClose={mockOnClose} item={itemMock} onAddToOrder={mockOnAddToOrder} />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Delicious pizza')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<Modal isOpen={true} onClose={mockOnClose} item={itemMock} onAddToOrder={mockOnAddToOrder} />);
    const closeButton = screen.getByRole('button', { name: /×/ });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('allows quantity to be changed', () => {
    render(<Modal isOpen={true} onClose={mockOnClose} item={itemMock} onAddToOrder={mockOnAddToOrder} />);
    const increaseButton = screen.getByRole('button', { name: '+' });
    const quantityDisplay = screen.getByText('1');

    fireEvent.click(increaseButton);

    expect(quantityDisplay).toHaveTextContent('2');
  });
});
