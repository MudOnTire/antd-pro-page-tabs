import React, { useContext, useEffect } from 'react'
import { context } from './context'

interface IRouteInterceptorProps {
  route: Object
  location: Object
}

const RouteInterceptor: React.FC<IRouteInterceptorProps> = (props) => {
  const store = useContext(context)
  const { route, location, children } = props

  const updateTabs = () => {
    const tab: Tab = { route, location, children }
    const newTabs = [...store.tabs]
    // route.path being the same means tab already exists
    const exists = newTabs.some((t) => t.route.path === tab.route.path)
    if (!exists) {
      newTabs.push(tab)
    }
    store.dispatch({
      type: CONTEXT_ACTIONS.UPDATE_TABS,
      payload: newTabs
    })
  }

  useEffect(updateTabs, [])

  return <>{children}</>
}

export default RouteInterceptor
