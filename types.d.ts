declare module "is-firefox-order" {
  type Headers = Record<string, string> | string[] | Array<[string, string]>;
  type IsFirefoxOrderOptions = {
    areRawHeaders: boolean;
  };

  function IsFirefoxOrder(
    headers: Headers,
    options: IsFirefoxOrderOptions = { areRawHeaders: false }
  ): boolean;

  export = IsFirefoxOrder;
}
