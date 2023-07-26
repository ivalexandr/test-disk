export interface IYaAuthSuggestParams {
  client_id: string;
  response_type: string;
  redirect_uri?: string;
}

export interface IYaAuthSuggestBtnParams {
  view: string;
  parentId: string;
  buttonView: string;
  buttonTheme: string;
  buttonSize: string;
  buttonBorderRadius: number;
}

export interface IHandlerResponse {
  access_token: string;
  expires_in: string;
  extraData: {
    flag: boolean;
  };
  token_type: string;
}

type THanler = () => Promise<IHandlerResponse>

declare global {
  class YaAuthSuggest {
    static init(params: IYaAuthSuggestParams, path: string, obj: IYaAuthSuggestBtnParams): Promise<{ handler: THanler }>
  }

  declare function YaSendSuggestToken(origin: string, extraData: { flag: boolean }): void
}

