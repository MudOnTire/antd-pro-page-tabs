import React, { useContext } from 'react';
import { context } from './context';
import { Tab, CONTEXT_ACTIONS, Position } from './types';

import styles from './index.less';

interface ContextMenuProps {
  tab: Tab | undefined;
  position: Position | undefined;
  history: any,
  handleTabClose: Function
}

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { tab, position, history, handleTabClose } = props;
  const store = useContext(context);
  const { tabs, dispatch } = store;

  const updateTabs = (newTabs: Tab[]) => {
    dispatch({
      type: CONTEXT_ACTIONS.UPDATE_TABS,
      payload: newTabs
    });
  }

  const closeTab = () => {
    if (!tab) return;
    handleTabClose(tab.location.pathname, 'remove');
  }

  const closeRightTabs = () => {
    if (!tab) return;
    const index = tabs.indexOf(tab);
    if (index < 0) return;
    history.push(tab.location);
    updateTabs(tabs.slice(0, index + 1));
  }

  const closeAllTabs = () => {
    history.push('/');
    updateTabs([]);
  }

  return (
    <ul
      className={`${styles.contextMenu} ${tab && styles.show}`}
      style={{ left: position?.x, top: position?.y }}
    >
      <li onClick={closeTab}>Close Tab</li>
      <li onClick={closeRightTabs}>Close Tabs to The Right</li>
      <li onClick={closeAllTabs}>Close All Tabs</li>
    </ul>
  )
}

export default ContextMenu;