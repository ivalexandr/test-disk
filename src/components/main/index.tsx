import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getFromLocalStorage, setToLocalStorage } from '../../services/local-storage.service';
import { IHandlerResponse } from '../../declares/type';
import { Upload } from '../upload';

export const Main = () => {
  const [auth, setAuth] = useState<IHandlerResponse | null>(null);
  const [isSignIn, setIsSignIn] = useState<boolean>();

  const loadScriptHandler = useCallback(async () => {
    try {
      const { handler } = await YaAuthSuggest.init({
        client_id: process.env.REACT_APP_CLIENT_ID || '',
        response_type: 'token',
        redirect_uri: process.env.REACT_APP_ORIGIN_AUTH
      }, process.env.REACT_APP_ORIGIN || '', {
                  view: 'button',
                  parentId: 'container',
                  buttonView: 'main',
                  buttonTheme: 'light',
                  buttonSize: 'm',
                  buttonBorderRadius: 0
              })
      const data = await handler();
      setToLocalStorage('auth', data)
      setIsSignIn(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const authData = getFromLocalStorage<IHandlerResponse>('auth');
    if (authData) {
      setAuth(authData);
      return;
    }

    const script = document.getElementById('script-suggest');
    if (script) {
      script.addEventListener('load', loadScriptHandler);
    }
    return () => script?.removeEventListener('load', loadScriptHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  return (
    <div>
      <Helmet>
        <script id="script-suggest" src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js"></script>
      </Helmet>
      { !auth && <h2>Сначала необходимо выполнить вход используя Yandex ID (тут должна появится кнопка Яндекса)</h2> }
      { auth && <Upload auth={ auth }/> }
    </div>
  )
};