import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
    breakpoints: {
      ...themes.light.custom.breakpoints,
      values: {
        ...themes.light.custom.breakpoints.values,
        lg: 1430,
        md: 1100,
        sm: 799,
      },
    },
  });

  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
