import * as React from 'react';

import { InputField } from './components/InputField';

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    }

render() {
    return (
        <div>
          <InputField />
        </div>
      );
    }
  }
