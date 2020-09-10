import React, { useState, useContext, useEffect } from 'react';
import { Tabs } from 'antd';
import { context, provider as TabsProvider } from './context';
import { UmiComponentProps, CONTEXT_ACTIONS, Tab, Position, ContextMenuLabels } from './types';
import { isTabActive } from './utils';
import ContextMenu from './ContextMenu';
import styles from './index.less';

const { TabPane } = Tabs;

/**
 * TabBar component placed on top of a page
 */
const TabBar: React.FC<{
  location: any;
  history: any;
  defaultChildren: React.ReactNode;
  contextMenuLabels?: ContextMenuLabels
}> = props => {
  const [targetTab, setTargetTab] = useState<Tab>();
  const [position, setPosition] = useState<Position>();
  const store = useContext(context);
  const { tabs, dispatch } = store;

  const { location, defaultChildren, history, contextMenuLabels } = props;
  const isLocationInTab = tabs.some(
    tab => tab.location.pathname === location.pathname,
  );

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.location.pathname === key);
    if (tab) {
      history.push(tab.location);
    }
  };

  /**
   * Handle tab remove
   * @param tabKey Key of tab to be removed
   * @param action Name of action
   */
  const handleEdit = (tabKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const tabIndex = tabs.findIndex(tab => tab.location.pathname === tabKey);
      if (tabIndex < 0) return;
      let nextActiveTab;
      if (isTabActive(tabKey, location)) {
        nextActiveTab = tabs[tabIndex + 1] ||
          tabs[tabIndex - 1] || { location: '/' };
      }
      if (nextActiveTab) {
        history.push(nextActiveTab.location);
      }
      const newTabs = [...tabs];
      newTabs.splice(tabIndex, 1);
      dispatch({
        type: CONTEXT_ACTIONS.UPDATE_TABS,
        payload: newTabs,
      });
    }
  };

  /**
   * Show context menu when right click tab menus
   */
  const handleContextMenu = (e: React.MouseEvent, tab: Tab) => {
    e.preventDefault();
    setTargetTab(tab);
    setPosition({ x: e.clientX, y: e.clientY });
  }

  const attachEvents = () => {
    function cleanTargetTab() {
      setTargetTab(undefined)
    }
    document.addEventListener('click', cleanTargetTab);
    return () => {
      document.removeEventListener('click', cleanTargetTab);
    }
  }

  useEffect(attachEvents, []);

  return (
    <div className='ant-page-tabs'>
      <Tabs
        className='ant-page-tab-list'
        hideAdd
        type="editable-card"
        onChange={handleTabChange}
        onEdit={handleEdit}
        activeKey={location.pathname}
      >
        {tabs.map(tab => {
          return (
            <TabPane
              tab={
                <span
                  onContextMenu={(e) => { handleContextMenu(e, tab) }}
                  className={styles.tabLabel}
                >
                  {tab.route.tabLocalName || tab.route.name}
                </span>
              }
              key={tab.location.pathname}>
              {tab.children}
            </TabPane>
          );
        })}
      </Tabs>
      {!isLocationInTab && defaultChildren}
      <ContextMenu
        tab={targetTab}
        position={position}
        history={history}
        handleTabClose={handleEdit}
        menuLabels={contextMenuLabels}
      />
    </div>
  );
};

interface TabLayoutProps extends UmiComponentProps {
  contextMenuLabels?: ContextMenuLabels
}

const TabLayout: React.FC<TabLayoutProps> = props => {
  const { children, location, history, contextMenuLabels } = props;

  return (
    <TabsProvider>
      <TabBar
        history={history}
        location={location}
        defaultChildren={children}
        contextMenuLabels={contextMenuLabels}
      />
    </TabsProvider>
  );
};

export default TabLayout;
