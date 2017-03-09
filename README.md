## React-antd-CRUD

本项目是基于 react 和 antd 的 CRUD 应用。

### 开始

项目使用官方脚手架 [create-react-app](https://github.com/facebookincubator/create-react-app) 搭建，相关指令同理。

### 说明

本项目详细说明参看[博客](http://www.zhaoshibo.net/blog/2017/03/09/%E4%BB%8E%E4%B8%80%E4%B8%AA%20CRUD%20%E4%B8%8A%E6%89%8B%20React%20%E5%92%8C%20AntD/)。

主要目录结构：

```bash
|-- api
|   |-- sqlData.js      # 操作 sqlData 的 ajax 方法
|-- components
|   |-- App.jsx         # 页面
|   |-- Content.jsx     # 页面主体内容区
|   |-- Factory.jsx     # 表单组件工厂
|   |-- FormModal.jsx   # 弹出的增加或编辑的表单组件
|   |-- Search.jsx      # 搜索组件
|-- libs
|   |-- ajax.js         # ajax 实例及公共方法
|   |-- util.js         # 工具方法
|-- store
|   |-- sqlConfig.js    # 数据库表单配置项
|-- index.js            # 入口文件
|-- style.css           # 样式文件
```

主要组件结构：

```bash
|-- App
|   |-- Menu                # 导航菜单
|   |-- Content             # 主要内容区
|       |-- Search          # 搜索组件
|           |-- Factory     # 表单工厂
|       |-- ButtonGroup     # 操作按钮群
|       |-- Table           # 表格组件
|           |-- Pagination  # 分页组件
|       |-- FormModal       # 弹出的编辑表单
|           |-- Factory     # 表单工厂
```

组件结构图解：

![react-antd-crud](http://7xlivs.com1.z0.glb.clouddn.com/2017/03/09/%E4%BB%8E%E4%B8%80%E4%B8%AA%20CRUD%20%E4%B8%8A%E6%89%8B%20React%20%E5%92%8C%20AntD/react-antd-crud.png)