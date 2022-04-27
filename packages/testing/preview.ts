export const buildComponentPreviewURL = (
  prototypeName: string,
  sitePackageKey: string,
  props: object = {}
): string => {
  return `/monocle/preview/index?prototypeName=${encodeURIComponent(
    prototypeName
  )}&propSet=__default&useCase=__default&sitePackageKey=${sitePackageKey}&locales=&props=${encodeURIComponent(
    JSON.stringify(props)
  )}`;
};
