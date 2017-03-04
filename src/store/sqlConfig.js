export default [
  {
    tableName: 'HIAP',
    name: '表 http_in_active_page',
    headers: [
      {
        tableKey: 'id',
        name: 'id',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'req',
        name: 'req',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'hit',
        name: 'hit',
        type: 'display',
        width: 80,
      },
      {
        tableKey: 'hour',
        name: 'hour',
        type: 'text',
        width: 50,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'day',
        name: 'day',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
    ],
  },
  {
    tableName: 'Page',
    name: '表 page',
    headers: [
      {
        tableKey: 'id',
        name: 'id',
        type: 'display',
        width: 50,
      },
      {
        tableKey: 'req',
        name: 'req',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
      {
        tableKey: 'comment',
        name: 'comment',
        type: 'text',
        width: 150,
        validators: [
          '',
        ],
      },
      {
        tableKey: 'status',
        name: 'status',
        type: 'text',
        width: 150,
        validators: [
          'required',
        ],
      },
    ],
  }];
