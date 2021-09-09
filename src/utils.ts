import isEqual from 'lodash/isEqual';

export function getTabKeyFromLocation(location: Location): string {
  const { pathname, search, hash } = location;
  return `${pathname}${search}${hash}`;
}

export function isTabActive(tabKey: string, location: any) {
  return tabKey === getTabKeyFromLocation(location);
}

export function isLocationChanged(prevLoca: any, currLoca: any) {
  const { key, search, ...otherPrevloca } = prevLoca;
  const { key: currKey, search: currSearch, ...otherCurrloca } = currLoca;

  if (otherPrevloca.query) {
    for (const key in otherPrevloca.query) {
      otherPrevloca.query[key] = otherPrevloca.query[key].toString();
    }
  }
  if (otherCurrloca.query) {
    for (const key in otherCurrloca.query) {
      otherCurrloca.query[key] = otherCurrloca.query[key].toString();
    }
  }

  return !isEqual(otherPrevloca, otherCurrloca);
}
