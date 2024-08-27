// withEntries.js
import React from 'react';
import { EntryContext } from './EntryContext';

const withEntries = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <EntryContext.Consumer>
          {context => <WrappedComponent {...this.props} {...context} />}
        </EntryContext.Consumer>
      );
    }
  };
};

export default withEntries;
