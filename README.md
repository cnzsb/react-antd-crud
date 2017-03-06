## React-antd-CRUD

本项目是基于 react 和 antd 的 CRUD 应用。项目具体的说明详见[文章](http://zhaoshibo.net/)。

### 开始

项目使用官方脚手架 [create-react-app](https://github.com/facebookincubator/create-react-app) 搭建，相关指令同理。

### 说明

项目中的 `sqlConfig` 文件是根据不同数据库表进行的配置，文件中的 validators 并没有用到，但是后期依旧可以按需扩展。在配置对应表选项后，也需要写对应的 `ajax` 请求文件，目前都在 `api/sqlData.js` 文件中。