import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { context, provider as TabsProvider } from './context';
import { UmiComponentProps, CONTEXT_ACTIONS } from './types';
import { isTabActive } from './utils';
import styles from './index.css';

const { TabPane } = Tabs;

/**
 * TabBar component placed on top of a page
 */
const TabBar: React.FC<{
  location: any;
  history: any;
  defaultChildren: React.ReactNode;
}> = props => {
  const store = useContext(context);
  const { tabs, dispatch } = store;

  const { location, defaultChildren, history } = props;
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

  return (
    <div className={styles.tabContainer}>
      <Tabs
        hideAdd
        type="editable-card"
        onChange={handleTabChange}
        onEdit={handleEdit}
        activeKey={location.pathname}
      >
        {tabs.map(tab => {
          return (
            <TabPane tab={tab.route.name} key={tab.location.pathname}>
              {tab.children}
            </TabPane>
          );
        })}
      </Tabs>
      {!isLocationInTab && defaultChildren}
    </div>
  );
};

const TabLayout: React.FC<UmiComponentProps> = props => {
  const { children, location, history } = props;
  return (
    <TabsProvider>
      <TabBar
        history={history}
        location={location}
        defaultChildren={children}
      />
    </TabsProvider>
  );
};

export default TabLayout;
