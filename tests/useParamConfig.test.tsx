import { renderHook, act } from '@testing-library/react';
import { useParamConfig } from '../src/hooks/useParamConfig';
import { MemoryRouter } from 'react-router-dom';

describe('useParamConfig', () => {
  it('parses and updates paramMap correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/?settings=foo~bar']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useParamConfig('settings'), { wrapper });

    expect(result.current[0]).toEqual({ foo: 'bar' });

    act(() => {
      result.current[1]({ foo: 'baz' });
    });

    expect(result.current[0]).toEqual({ foo: 'baz' });
  });
});
