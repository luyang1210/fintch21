import React from 'react';

type PreferencesContextType = {
  toggleFaceID: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  toggleFaceID: () => {},
});
