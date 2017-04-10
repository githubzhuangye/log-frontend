##react-router-redux-material-echarts-bigkit
大型redux项目起步
##项目包含以下内容

UI框架采用material,图表框架采用echarts

redux组件包含以下内容:
1. router
2. redux
3. react-router-redux
4. redux-logger
5. redux-thunk

新项目起步过程:
1.在views中添加页面组件
2.在component中添加页面对应的页面内组件
3.在routes中添加路由
4.在SideBar组件中添加对应的路由



【目录结构】


.
├── app							#开发目录
	├──views					应用中某个页面的入口文件,一般为路由组件
	|   ├──Home.jsx
	|   ├──One.jsx
	|   ├──OneDetail.jsx
	|   ├──Two.jsx
	|   ├──TwoDetail.jsx
	|   ├──css
	|   └──redux
	|		├──OneRedux.js      页面中所有与redux相关的reducer,action creator的汇总,即components/Home下所有Redux.js的汇总
	|		└──TwoRedux.js
	|
	├──components				所有应用的组件
	|   ├──One					例如views/中一个名为Home的view,则在components/中就有一个名为Home的子文件夹
	|	├	├──css
	|	├	└──redux
	|   ├──Two
	|	├	├──css
	|	├	└──redux
	|   └──common				不归属于任何view的组件,如一些公共组件
	|		├──Table.jsx
	|		├──Table.css
	|		└──TableRedux.js
	├──containers
	|   ├──DevTools.js			配置DevTools
	|   └──Root.js				一般被app.js依赖,用于根据环境判断是否需要加载DevTools
	|
	├──layouts					布局相关的组件及样式,如菜单,侧边栏,header,footer等
	|   ├──HeaderBar.jsx
	|   ├──SideBar.jsx
	|   └──css
	|	   ├──HeaderBar.css
	|	   └──SideBar.css
	|
	├──reducers
	|   └──index.js				整个应用中所有reducer的汇总
	|
	├──stores					redux store相关的配置
	|   └──configureStore.js
	|
	├──routes					路由相关的配置
	|
	├──utils					工具函数
	|
	├──constants				常量
	|
	├──styles					全局公共样式
	|
	├──App.jsx					应用的入口
	|
	└──App.css					应用主样式表

|
├── node_modules        #包文件夹
├── .gitignore
├── index.html
├── index.js
├── webpack.config.js
└── package.json

这里，我们只关注我们的 app 开发目录。

