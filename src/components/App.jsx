import React from 'react';
import { Menu } from 'antd';
import Content from './Content';
import sqlData from '../store/sqlConfig';

const MenuItem = Menu.Item;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tableName: 'Users',
    };

    this.openTable = this.openTable.bind(this);
  }

  openTable({ key }) {
    this.setState({
      tableName: key,
    });
  }

  render() {
    return (
      <div className="body">
        <h2 style={{ margin: '30px 0' }}>React CRUD</h2>
        <Menu
          style={{ backgroundColor: '#f3f3f4' }}
          defaultSelectedKeys={[this.state.tableName]}
          mode="horizontal"
          onClick={this.openTable}
        >
          {
            sqlData.map(data => (
              <MenuItem key={data.tableName}>
                {data.name}
              </MenuItem>
            ))
          }
        </Menu>
        <Content tableName={this.state.tableName} />
      </div>
    );
  }
}
