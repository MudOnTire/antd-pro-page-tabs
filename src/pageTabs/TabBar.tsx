import React, { useEffect, useContext, useState } from 'react'

interface ITabBarProps {
  activeRoute: Object
  onTabClick?: (tab: any, tabs: []) => void
  onTabClose?: (closedTab: any, nextTab: any, tabs: []) => void
  tintColor?: string
}

const TabBar: React.FC<ITabBarProps> = (props) => {
  const [hoverIndex, setHoveredIndex] = useState<number>(-1)

  return <div>hi</div>
}

TabBar.defaultProps = {
  onTabClick: () => {},
  onTabClose: () => {},
  tintColor: '#0BB27A'
}

export default TabBar
