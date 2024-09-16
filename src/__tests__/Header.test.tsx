import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header/Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Header Component', () => {
  const defaultProps = {
    bannerImage: 'https://example.com/banner.jpg',
    navBackgroundColour: '#fff',
    primaryColour: '#000',
    isMobile: false,
    drawerOpen: false,
    onToggleDrawer: jest.fn(),
    tabValue: 0,
    onTabChange: jest.fn(),
  };

  test('renders banner image with correct src and alt text', () => {
    render(<Header {...defaultProps} />);
    const bannerImage = screen.getByAltText('banner_alt');
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', defaultProps.bannerImage);
  });

  test('renders mobile layout with Drawer and tab name when isMobile is true', () => {
    render(<Header {...{ ...defaultProps, isMobile: true, tabValue: 1 }} />);
    expect(screen.getByText('login')).toBeInTheDocument(); 
    const drawerButton = screen.getByRole('button', { name: /☰/ });
    expect(drawerButton).toBeInTheDocument();
    fireEvent.click(drawerButton);
    expect(defaultProps.onToggleDrawer).toHaveBeenCalled();
  });

  test('applies correct styles based on props', () => {
    render(<Header {...defaultProps} />);
    const header = screen.getByRole('banner'); 
    expect(header).toHaveStyle(`background-color: ${defaultProps.navBackgroundColour}`);
    expect(header).toHaveStyle(`color: ${defaultProps.primaryColour}`);

    const bannerImage = screen.getByAltText('banner_alt');
    expect(bannerImage).toHaveStyle('width: 100%');
    expect(bannerImage).toHaveStyle('height: 300px');
  });
});
