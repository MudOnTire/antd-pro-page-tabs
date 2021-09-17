export enum CONTEXT_ACTIONS {
  UPDATE_TABS,
}

/**
 * Tab object
 */
export interface Tab {
  route: any;
  location: any;
  children: React.ReactNode;
  query?: any,
  pathname?: any,
  hash?: any,
}

/**
 * Context state to store tab informations
 */
export interface ContextState {
  tabs: Array<Tab>;
  dispatch: Function;
}

/**
 * Context action to update context state
 */
export interface ContextAction {
  type: CONTEXT_ACTIONS;
  payload: Array<Tab>;
}

export interface UmiComponentProps {
  children: React.ReactNode;
  history: History;
  location: any;
  match: { isExact: boolean; params: Object; path: string; url: string };
  route: any;
  routes: any[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuLabels {
  closeTab?: string,
  closeRightTabs?: string,
  closeAllTabs?: string
}