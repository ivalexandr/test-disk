import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export const Auth = () => {

  useEffect(() => {
    document.getElementById('script-token')?.addEventListener('load', () => {
      YaSendSuggestToken(process.env.REACT_APP_ORIGIN || '', { flag: true });
    });
  }, []);

  return (
    <Helmet>
      <script id="script-token" src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"></script>
    </Helmet>
  );
};
