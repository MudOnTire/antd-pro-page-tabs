// eslint-disable-next-line no-unused-vars
import { IRoute, Location } from 'umi'

export enum CONTEXT_ACTIONS {
  UPDATE_TABS
}

/**
 * Tab object
 */
export interface Tab {
  route: IRoute
  location: Location
  children: React.ReactNode
}

/**
 * Context state to store tab informations
 */
export interface ContextState {
  tabs: Array<Tab>
  dispatch: Function
}

/**
 * Context action to update context state
 */
export interface ContextAction {
  type: CONTEXT_ACTIONS
  payload: Array<Tab>
}
