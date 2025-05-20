import { renderHook, act } from '@testing-library/react';
import { useSubParamState } from '../src/hooks/useSubParamState';
import { MemoryRouter } from 'react-router-dom';

describe('useSubParamState', () => {
  it('reads and writes subParamKey correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/?config=mode~edit']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useSubParamState('config', 'mode'), { wrapper });

    expect(result.current[0]).toBe('edit');

    act(() => {
      result.current[1]('view');
    });

    expect(result.current[0]).toBe('view');
  });
});
