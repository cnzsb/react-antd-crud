export default [
  {
    tableName: 'Users',
    name: '用户信息',
    headers: [
      {
        tableKey: 'id',
        name: 'ID',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'name',
        name: '姓名',
        type: 'text',
        width: 80,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'sex',
        name: '性别',
        type: 'text',
        width: 50,
      },
      {
        tableKey: 'age',
        name: '年龄',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'remark',
        name: '备注',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
    ],
  },
  {
    tableName: 'None',
    name: '异常模拟',
    headers: [
      {
        tableKey: 'id',
        name: 'id',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'name',
        name: '姓名',
        type: 'text',
        width: 80,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'comment',
        name: '评论',
        type: 'text',
        width: 200,
        validators: [
          '',
        ],
      },
      {
        tableKey: 'status',
        name: '状态',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
    ],
  }];
