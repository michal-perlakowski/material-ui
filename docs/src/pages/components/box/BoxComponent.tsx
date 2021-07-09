import * as React from 'react';
import useResizeObserver from '../../../../../packages/material-ui-utils/src/useResizeObserver';

export default function BoxComponent() {
  const [ready, setReady] = React.useState(false);
  const [rect, ref] = useResizeObserver<HTMLPreElement>();
  if (!ready) {
    return <button type="button" onClick={() => setReady(true)}>Start</button>;
  }
  return (
    <pre ref={ref} style={{ width: '100%'  }}>
      {JSON.stringify(rect, null, 2)}
    </pre>
  );
}
