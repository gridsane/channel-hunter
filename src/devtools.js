import React from 'react';
import {createDevTools} from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey='H' changePositionKey='Q'>
    <LogMonitor />
  </DockMonitor>
);

export default DevTools;