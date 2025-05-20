import { renderHook } from '@testing-library/react';
import { useParamChangeWatcher } from '../src/hooks/useParamChangeWatcher';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { useParamConfig } from '../src/hooks/useParamConfig';

// Mock state shared across renders
let currentMap = {};
const setConfigMock = vi.fn();

vi.mock('../src/hooks/useParamConfig', () => ({
  useParamConfig: () => [currentMap, setConfigMock],
}));

describe('useParamChangeWatcher', () => {
  it('calls onChange when paramMap changes', async () => {
    let capturedConfig: any = null;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/?filter=foo~bar']}>{children}</MemoryRouter>
    );

    const { rerender } = renderHook(
      () => useParamChangeWatcher('filter', (config) => (capturedConfig = config)),
      { wrapper }
    );

    expect(capturedConfig).toBeNull();

    // Simulate paramMap change
    currentMap = { foo: 'bar' };
    rerender();

    expect(capturedConfig).toEqual({ foo: 'bar' });
  });
});
