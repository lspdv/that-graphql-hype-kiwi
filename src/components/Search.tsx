import * as React from 'react';

import { InputField } from './InputField';

export class Search extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <InputField />
      </div>);
    }
  }
