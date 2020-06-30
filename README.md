# antd-pro-page-tabs

Page tab component for umi or ant design pro projects. 🚴🏻

![demo](Antd-Pro-Page-Tabs-demo.gif)

You can find the demo [HERE](https://github.com/MudOnTire/page-tabs-umi-app) !

# Installation

```sh
yarn add antd-pro-page-tabs
```

or

```sh
npm install antd-pro-page-tabs
```

# Setup

This project depends on [umi](https://umijs.org/)'s [routing system](https://umijs.org/docs/routing) and [@umijs/plugin-layout
](https://umijs.org/plugins/plugin-layout), all top level routes should be wrapped in a `TabLayout`, and pages need to be displayed in a `Tab` should be wrapped by a `RouteWatcher` in order to notify the library when that page open..

Since umi's config file only receive strings as route component's values. So we can create two files in our project and import/export `TabLayout` and `RouteWatcher` from the library.

For example, we create `TabLayout.tsx` and `RouteWatcher.tsx` in `src/components/PageTab`:

**TabLayout.tsx:**

```js
import { TabLayout } from 'antd-pro-page-tabs';

export default TabLayout;
```


**RouteWatcher.tsx**

```js
import { RouteWatcher } from 'antd-pro-page-tabs';

export default RouteWatcher;
```

Next, we update the routing configuration of our project like:

```js
const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  ...

  routes: [
    {
      path: '/',
      component: '@/components/PageTab/TabLayout',
      flatMenu: true, // lift sub-routes to top up
      routes: [
        {
          name: 'Home',
          icon: 'smile',
          path: '/home',
          component: '@/pages/home',
          wrappers: [RouteWatcher],
        },
        {
          name: 'About',
          icon: 'smile',
          path: '/about',
          component: '@/pages/about',
          wrappers: [RouteWatcher],
        },
        {
          name: 'Contact',
          icon: 'smile',
          path: '/contact',
          component: '@/pages/contact',
          wrappers: [RouteWatcher],
        }
      ],
    },
  ],
}
```

**💥 Don't forget to set `flatMenu` of the root route to `true`, it will hide the root route menu and lift the sub-routes to the top level, and then menus will be created for them.**

That's all. Enjoy! 🎈
