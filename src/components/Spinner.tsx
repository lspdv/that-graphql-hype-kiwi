import * as React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { tealA700 } from 'material-ui/styles/colors';

import './global.css';

export const Spinner = () => (
  <div className="spinner">
    <CircularProgress
      color={tealA700}
    />
  </div>
);
