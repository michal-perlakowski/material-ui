import * as React from 'react';
import { expect } from 'chai';
import { act, createClientRender } from 'test/utils';
import { spy } from 'sinon';
import useResizeObserver from './useResizeObserver';
import useForkRef from './useForkRef';

const TestComponent = (
  { children }: {
    children: (data: [DOMRectReadOnly | null, React.MutableRefObject<HTMLDivElement | null>]) => React.ReactElement,
  },
) => {
  return children(useResizeObserver());
};

describe('useResizeObserver', () => {
  const render = createClientRender();

  it('should correctly report element size', async () => {
    let testRef: React.MutableRefObject<HTMLDivElement | null>;
    const onResize = spy();
    render(
      <TestComponent>
        {([ innerRect, ref ]) => {
          testRef = React.useRef<HTMLDivElement | null>(null);
          const forkedRef = useForkRef(testRef, ref);
          React.useEffect(() => {
            onResize(innerRect);
          }, [innerRect]);
          return (
            <div ref={forkedRef} style={{ width: 150, height: 80 }} />
          );
        }}
      </TestComponent>
    );
    await act(() => new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }));
    expect(onResize.callCount).to.equal(1);
    expect(onResize.firstCall.args[0]).to.deep.include({ width: 15, height: 80 });
    // act(() => {
    //   testRef.current!.style.width = '120px';
    //   testRef.current!.style.height = '200px';
    // });
    // console.log(onResize);
    // expect(onResize.callCount).to.equal(2);
    // expect(onResize.secondCall.args[0]).to.deep.include({ width: 15, height: 80 });
  });
});
