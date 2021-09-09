import React, { useContext } from 'react';
import { context } from './context';
import { Tab, CONTEXT_ACTIONS, Position, ContextMenuLabels } from './types';
import { getTabKeyFromLocation } from './utils';

import styles from './index.less';

interface ContextMenuProps {
  tab: Tab | undefined;
  position: Position | undefined;
  history: any,
  handleTabClose: Function,
  menuLabels?: ContextMenuLabels
}

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { tab, position, history, handleTabClose, menuLabels } = props;
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
    handleTabClose(getTabKeyFromLocation(tab.location), 'remove');
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
      <li onClick={closeTab}>{menuLabels?.closeTab || 'Close Tab'}</li>
      <li onClick={closeRightTabs}>{menuLabels?.closeRightTabs || 'Close Tabs to The Right'}</li>
      <li onClick={closeAllTabs}>{menuLabels?.closeAllTabs || 'Close All Tabs'}</li>
    </ul>
  )
}

export default ContextMenu;