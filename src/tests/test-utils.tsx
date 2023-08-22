/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import { afterEach } from 'vitest';
import { HashRouter } from 'react-router-dom';

// testing
import { cleanup, render } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  // wrap provider(s) here if needed
  return <HashRouter>{children}</HashRouter>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

afterEach(() => {
  cleanup();
});

export * from '@testing-library/react';
export * from './__mocks__';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
