import { describe, expect, it } from 'vitest';
import { act, render, screen, waitFor, fireEvent } from '../test-utils';

import App from '~/App';

describe('Renders every page', () => {
  it('The Requests load correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    // navigates to the requests page
    await act(async () => {
      fireEvent.click(screen.getByTestId('requests-page-btn'));
    });
    expect(screen.getByTestId('requests-page-title')).toBeInTheDocument();

    // loads the request
    await waitFor(() => {
      expect(screen.getAllByTestId('request-card').length).toBe(1);
    });
  });

  it('Opens Request Details correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    // navigates to the requests page
    await act(async () => {
      fireEvent.click(screen.getByTestId('requests-page-btn'));
    });
    expect(screen.getByTestId('requests-page-title')).toBeInTheDocument();

    // loads the request page
    await waitFor(() => {
      expect(screen.getAllByTestId('request-card').length).toBe(1);
    });

    // navigates to one Request Details page
    await act(async () => {
      fireEvent.click(screen.getAllByTestId('request-card')[0]);
    });
    expect(screen.getByTestId('request-page-title')).toBeInTheDocument();
  });
});
