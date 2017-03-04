import React from 'react';
import { Table, Button, Icon, notification, message, Modal } from 'antd';
import Search from './Search';
import FormModal from './FormModal';
import getSqlData from '../api/sqlData';
import { findIndexByKey } from '../libs/util';
import sqlData from '../store/sqlConfig';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

export default class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      searchForms: {},
      selectedRowKeys: [],
      lists: [],
      // 默认 table 头为空
      columns: [{
        title: '',
        key: 'initial',
      }],
      loading: false,
      showFormModal: false,
      confirmLoading: false,
      formModalTitle: '新增',
      formModalType: 'add', // add, edit, editMul
      formConfigs: [],
      formValues: {},
      addNum: 0,
    };
  }

  componentDidMount() {
    this.renderLists(this.props.tableName);
  }

  componentWillReceiveProps({ tableName }) {
    if (this.props.tableName === tableName) return;
    this.renderLists(tableName);
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  // 获取表数据
  getLists = tableName => (
    getSqlData[`getTable${tableName}`]()
      .then(data => (
        Promise.resolve(data.map((item) => {
          item.key = item.id;
          return item;
        }))
      ))
  )

  // 处理 <FormModal /> 中不同类型的表单事件
  formOnChange = {
    inputOnChange: (event, key) => {
      const formValues = { ...this.state.formValues };
      formValues[key] = event.target.value.trim();
      this.setState({ formValues });
    },
  }

  // 处理 <Search /> 中不同类型的表单事件
  searchOnChange = {
    inputOnChange: (event, key) => {
      const searchForms = { ...this.state.searchForms };
      searchForms[key] = event.target.value.trim();
      this.setState({ searchForms });
    },
  }

  submitSearch = () => {
    const forms = Object.entries({ ...this.state.searchForms }).filter(item => !item[1] === false);
    if (!forms.length) return;

    this.setState({ loading: true });
    const hideMsg = message.loading('搜索中...', 0);

    // 模拟 ajax
    this.getLists(this.props.tableName)
      .then((data) => {
        const lists = data.filter(item => (
          forms.every(arr => String(item[arr[0]]) === String(arr[1]))
        ));
        this.setState({
          selectedRowKeys: [],
          lists,
          loading: false,
        }, hideMsg);
      })
      .catch(() => {
        this.setState({
          loading: false,
        }, hideMsg);
      });
  }

  resetSearch = () => {
    const forms = Object.entries({ ...this.state.searchForms }).filter(item => !item[1] === false);
    if (!forms.length) return;

    this.setState({ loading: true });
    const hideMsg = message.loading('重置中...', 0);

    this.getLists(this.props.tableName)
      .then((lists) => {
        this.setState({
          searchForms: {},
          lists,
          selectedRowKeys: [],
          loading: false,
        }, hideMsg);
      })
      .catch(() => {
        this.setState({
          loading: false,
        }, hideMsg);
      });
  }

  addRows = () => {
    this.setState({
      showFormModal: true,
      formModalTitle: '新增',
      formModalType: 'add',
    });
  }

  editRows = () => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const lists = [...this.state.lists];
    const currentRows = lists[findIndexByKey('key', selectedRowKeys[0], lists)];
    const isSingle = selectedRowKeys.length === 1;
    this.setState({
      showFormModal: true,
      formModalTitle: isSingle ? '修改' : '批量修改',
      formModalType: isSingle ? 'edit' : 'editMul',
      formValues: isSingle ? currentRows : {},
    });
  }

  delConfirm = () => {
    const selectedRowKeys = this.state.selectedRowKeys;

    confirm({
      title: '确定删除这些数据吗',
      content: `被选中行的ID：【${selectedRowKeys.join(', ')}】`,
      onOk: () => {
        this.setState({ loading: true });
        const hideMsg = message.loading('删除中...', 0);

        const lists = [...this.state.lists];
        // 根据已选择的 key 筛选 lists 中的索引并删除
        selectedRowKeys.forEach((val) => {
          lists.splice(findIndexByKey('key', val, lists), 1);
        });

        // 模拟 ajax
        setTimeout(() => {
          this.setState({
            loading: false,
            lists,
            selectedRowKeys: [],
          }, () => {
            hideMsg();
            notification.success({
              message: '成功',
              description: '删除数据成功',
            });
          });
        }, 1000);
      },
    });
  }

  submitFormModal = () => {
    this.setState({ confirmLoading: true });
    const hideMsg = message.loading('提交中...', 0);

    const formValues = { ...this.state.formValues };
    const lists = [...this.state.lists];
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const type = this.state.formModalType;
    let addNum = this.state.addNum;

    if (type === 'add') {
      addNum = this.state.addNum + 1;
      formValues.id = formValues.id || (lists[lists.length - 1].id + addNum);
      formValues.key = formValues.id;
      lists.unshift(formValues);
    } else {
      selectedRowKeys.forEach((key) => {
        const index = findIndexByKey('key', key, lists);
        lists[index] = Object.assign(lists[index], formValues);
      });
    }

    // 模拟 ajax 添加
    setTimeout(() => {
      this.setState({
        lists,
        addNum,
        formValues: {},
        confirmLoading: false,
        showFormModal: false,
      }, () => {
        hideMsg();
        notification.success({
          message: '成功',
          description: `${type === 'add' ? '新增' : '修改'}数据完成`,
        });
      });
    }, 1000);
  }

  cancelFormModal = () => {
    this.setState({
      showFormModal: false,
      formValues: {},
    });
  }

  // 按需渲染表数据
  renderLists(tableName) {
    const conf = sqlData[findIndexByKey('tableName', tableName, sqlData)];
    // 初始化 table 的 header 配置
    const columns = conf.headers.map(header => ({
      title: header.name,
      dataIndex: header.tableKey,
      width: header.width,
    }));

    this.setState({
      columns,
      loading: true,
      formConfigs: conf.headers,
    });
    const hideMsg = message.loading('正在查询...', 0);

    this.getLists(tableName)
      .then((lists) => {
        this.setState({
          lists,
          loading: false,
        }, hideMsg);
      })
      .catch(() => {
        this.setState({
          lists: [],
          loading: false,
        }, hideMsg);
      });
  }

  render() {
    const {
      searchForms,
      selectedRowKeys,
      columns,
      lists,
      loading,
      showFormModal,
      confirmLoading,
      formModalTitle,
      formConfigs,
      formValues,
    } = this.state;
    const selectedLen = selectedRowKeys.length;

    // 此处声明的目的是为了每次 update 后保持 selectedRowKeys 与 state 中的同步
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <Search
          configs={formConfigs}
          values={searchForms}
          onChange={this.searchOnChange}
          resetSearch={this.resetSearch}
          submitSearch={this.submitSearch} />
        <div style={{ margin: '10px 0' }}>
          <ButtonGroup size="small">
            <Button type="primary" onClick={this.addRows}>
              <Icon type="plus-circle-o" />
              新增
            </Button>
            <Button type="primary" disabled={selectedLen < 1} onClick={this.editRows}>
              <Icon type="edit" />
              {selectedLen > 1 ? '批量修改' : '修改'}
            </Button>
            <Button type="primary" disabled={selectedLen < 1} onClick={this.delConfirm}>
              <Icon type="delete" />
              {selectedLen > 1 ? '批量删除' : '删除'}
            </Button>
          </ButtonGroup>
          <span style={{ marginLeft: 8 }}>
            {selectedLen > 0 && `共选择了 ${selectedLen} 个项目`}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={lists}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '40', '50'],
            showTotal(total) { return `共 ${total} 条`; },
          }}
          loading={loading} />
        <FormModal
          formModalTitle={formModalTitle}
          formConfigs={formConfigs}
          formValues={formValues}
          showFormModal={showFormModal}
          submitFormModal={this.submitFormModal}
          cancelFormModal={this.cancelFormModal}
          confirmLoading={confirmLoading}
          onChange={this.formOnChange} />
      </div>
    );
  }
}

Content.propTypes = {
  tableName: React.PropTypes.string,
};
