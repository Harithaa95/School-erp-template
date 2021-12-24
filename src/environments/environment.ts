// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let backendURL = 'http://7711-103-21-79-28.ngrok.io/';

export const environment = {
  production: false,
  loginURL:backendURL+'v1/login',
  extarctTokenURL: backendURL+'v1/extractToken',
  stateInfoURL: backendURL+'v1/DES/stateInfo'
};
