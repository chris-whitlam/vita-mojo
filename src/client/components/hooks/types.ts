export interface FetchState<T> {
  loading: boolean;
  data: T;
  error: any;
}

export interface FetchOptions {
  url: string;
  queryParams?: any;
}

export type FetchHookCallback<T> = (
  options?: Omit<FetchOptions, 'url'>,
) => Promise<FetchState<T>>;

export type FetchHookReturnValue<T> = [
  FetchState<T>,
  FetchHookCallback<T>,
  ...any
];

export type FetchHook<T> = (options?: FetchOptions) => FetchHookReturnValue<T>;
