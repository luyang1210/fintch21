import React from 'react';

const FirebaseContext = React.createContext(null);

export default FirebaseContext;
export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

export const withFirebaseHOC = Component => props => {
  return <FirebaseConsumer>{state => <Component {...props} firebase={state} />}</FirebaseConsumer>;
};