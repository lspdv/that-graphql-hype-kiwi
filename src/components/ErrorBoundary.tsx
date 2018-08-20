import * as React from 'react';

type State = {
  errorInfo: any,
  error: object
};

export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in child components
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary">
          <h2>
            Oooops. Did you fill all required form fields?
            <a
              href="https://lspdv.github.io/that-graphql-hype-kiwi/"
            >
              {' '}
              Try it again!
            </a>{' '}
          </h2>
          <h3>
            Error happened - somehow,
            somewhere over the rainbow. Might be missing form field, internet connection issue or
            more serious stuff! See detail message.{' '}
          </h3>
          <h2>
            You can raise issue {''}
            <a
              href="https://github.com/lspdv/that-graphql-hype-kiwi/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              on Github
            </a>{' '}
            if the error occurs permanently.
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
