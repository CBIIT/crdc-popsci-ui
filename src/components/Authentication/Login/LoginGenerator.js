import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import generateStyle from './utils/generateStyle';
import DEFAULT_CONFIG from './config';

export const LoginGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const useAuth = functions && typeof functions.useAuth === 'function'
    ? functions.useAuth
    : DEFAULT_CONFIG.functions.useAuth;

  const redirect = functions && typeof functions.redirect === 'function'
    ? functions.redirect
    : DEFAULT_CONFIG.functions.redirect;

  const useQuery = functions && typeof functions.useQuery === 'function'
    ? functions.useQuery
    : DEFAULT_CONFIG.functions.useQuery;

  const getRedirectPath = functions && typeof functions.getRedirectPath === 'function'
    ? functions.getRedirectPath
    : DEFAULT_CONFIG.functions.getRedirectPath;

  const getIdps = functions && typeof functions.getIdps === 'function'
    ? functions.getIdps
    : DEFAULT_CONFIG.functions.getIdps;

  // const stateProps = () => ({
  //   // autocomplete: state.login.autocomplete,
  // });

  // const dispatchProps = (dispatch) => ({
  //   signIn: (data) => dispatch(signInRed(data)),
  //   signOut: () => dispatch(signOutRed()),
  // });

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    Login: (props) => {
      const {
        headerMessage,
        styles,
        authenticationProviders,
        onSuccess,
        onError,
        AlertMessage,
        enabledAuthProviders,
      } = props;

      /* styles */
      const generatedStyle = generateStyle(styles);
      const useStyles = makeStyles(generatedStyle);
      const classes = useStyles();

      /* states */
      const [error, setError] = useState('');

      /* hooks */
      const { signInWithGoogle, signInWithNIH, signInWithAuthURL} = useAuth();
      const history = useHistory();
      const query = useQuery();

      /* variables */
      const internalRedirectPath = getRedirectPath(query);
      const idps = getIdps(enabledAuthProviders, authenticationProviders);

      /* event handlers */
      const onSuccessDefault = () => redirect(history, internalRedirectPath);
      const onErrorDefault = () => {};
      const onSuccessHandler = onSuccess || onSuccessDefault;
      const onErrorHandler = onError || onErrorDefault;

      const showAlert = (alertType, errorMsg = '') => {
        const key = Math.random();
        if (alertType === 'error') {
          setError(
            <AlertMessage key={key} severity="error" borderColor="#f44336" backgroundColor="#f44336" timeout={5000}>
              {errorMsg}
            </AlertMessage>,
          );
        }

        if (alertType === 'redirect') {
          setError(
            <AlertMessage key={key} severity="error" timeout={5000}>
              Please login to access protected data
            </AlertMessage>,
          );
        }

        return null;
      };

      const signInCall = (provider) => {
        if (provider) {
          switch (provider.key) {
            case 'google':
              signInWithGoogle(onSuccessHandler, onErrorHandler);
              break;
            case 'nih':
              signInWithNIH({ internalRedirectPath });
              break;
            case 'loginGov':
              signInWithNIH({ internalRedirectPath });
              break;
            case 'auth_url':
              signInWithAuthURL({ internalRedirectPath });
              break;
            default:
              showAlert('error', `The selected Identity Provider, ${provider.key}, is not currently supported. Please contact bento-help@nih.gov for more information.`);
          }
        }
      };

      /* useEffect hooks */
      useEffect(() => {
        if (internalRedirectPath !== '/') {
          showAlert('redirect');
        }
      }, []);

      return (
        <div className={classes.Container}>
            {/* Top Space */}
            <Grid container justifyContent="center" className={classes.emptySpace}>
              {error}
            </Grid>

            {/* Main Component */}
            <Grid container justifyContent="center">
              <Grid container item justifyContent="center" className={classes.Box}>
                <Grid container item className={classes.InnerBox}>
                  <p className={classes.LoginBoxTitle}>{headerMessage}</p>
                  <ul className={classes.LoginBoxInstruction}>
                    <li>Click on the below button to go to the NIH Login page. </li>
                    <li> Please enter your eRA Commons credentials. </li>
                    <li><strong>Note: Logging in with another identity provider will not grant access.</strong></li>
                  </ul>
                </Grid>
                <Grid container item xs={12} justifyContent="center" className={classes.LoginButtonGroup}>
                  {Object.values(idps).map((provider) => (
                    <Grid container item xs={12} justifyContent="center">
                      <Button
                        variant="outlined"
                        className={[classes.LoginButton]}
                        disableRipple
                        onClick={() => signInCall(provider)}
                      >
                        <Grid container item xs={1} justifyContent="center">
                          {provider.icon
                            ? <img src={provider.icon} className={classes.root} alt="alt coming" />
                            : <VpnKeyIcon />}

                        </Grid>
                        <Grid container item xs={11} justifyContent="center">
                          {provider.loginButtonText}
                        </Grid>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

          {/* Bottom Space */}
          <Grid container item justifyContent="center" className={[classes.emptySpace, classes.extraSpaceInBorrom]} />

        </div>
      );
    },
  };
};

export default LoginGenerator;
