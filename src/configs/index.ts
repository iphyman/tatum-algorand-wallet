export const config = {
  REGION: process.env.REACT_APP_REGION,
  apiGateway: {
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export const AmplifyConfig: any = {
  Auth: {
    mandatorySignIn: true,
    region: config.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    identityPoolRegion: config.REGION,
  },
  API: {
    endpoints: [
      {
        name: "TatumAlgoWallet",
        endpoint: config.apiGateway.URL,
        region: config.REGION,
      },
    ],
  },
};
