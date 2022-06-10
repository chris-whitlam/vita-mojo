export interface FetchState {
  loading: boolean;
  data: any;
  error: any;
}

export interface FetchOptions {
  url: string;
  queryParams: any;
}

export type FetchHookCallback = (
  options?: Omit<FetchOptions, 'url'>,
) => Promise<FetchState>;

export type FetchHookReturnValue = [FetchState, FetchHookCallback];

export type FetchHook = (options?: FetchOptions) => FetchHookReturnValue;
