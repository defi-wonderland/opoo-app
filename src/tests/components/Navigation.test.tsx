import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen } from '../test-utils';

import App from '~/App';

describe('Renders every page', () => {
  it('Renders landing page correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('landing-page-title')).toBeInTheDocument();
  });

  it('Should navigate to Requests page', async () => {
    await act(async () => {
      render(<App />);
    });

    // navigates to Requests page
    await act(async () => {
      fireEvent.click(screen.getByTestId('requests-page-btn'));
    });
    expect(screen.getByTestId('requests-page-title')).toBeInTheDocument();
  });

  it('Should navigate to About page', async () => {
    await act(async () => {
      render(<App />);
    });

    // navigates to app page
    await act(async () => {
      fireEvent.click(screen.getByTestId('requests-page-btn'));
    });
    expect(screen.getByTestId('requests-page-title')).toBeInTheDocument();

    // navigates to About page
    await act(async () => {
      fireEvent.click(screen.getByTestId('about-page-btn'));
    });
    expect(screen.getByTestId('about-page-title')).toBeInTheDocument();
  });

  it('Should navigate to FAQ page', async () => {
    await act(async () => {
      render(<App />);
    });

    // navigates to app page
    await act(async () => {
      fireEvent.click(screen.getByTestId('requests-page-btn'));
    });
    expect(screen.getByTestId('requests-page-title')).toBeInTheDocument();

    // navigates to faq page
    await act(async () => {
      fireEvent.click(screen.getByTestId('faq-page-btn'));
    });
    expect(screen.getByTestId('faq-page-title')).toBeInTheDocument();
  });
});
