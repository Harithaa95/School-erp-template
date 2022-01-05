
let backendURL = 'https://8945-103-252-26-118.ngrok.io/';
export const environment = {
  production: false,
  loginURL: backendURL + 'v1/login',
  extarctTokenURL: backendURL + 'v1/extractToken',
  stateInfoURL: backendURL + 'v1/DES/stateInfo',
  stateUpdateInfoURL: backendURL + 'v1/DES/updateStateInfo',
  uploadLogoURL: backendURL + 'v1/uploadToAws',
  downloadLogoURL: backendURL + 'v1/downloadFromAws'
};
