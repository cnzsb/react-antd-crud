import React from 'react';
import { Row, Col, Form, Button, Icon } from 'antd';
import Factory from './Factory';

const FormItem = Form.Item;

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { configs, values, onChange, submitSearch, resetSearch } = this.props;

    return (
      <div>
        <Form>
          <Row>
            {configs.map(config => (
              config.type === 'display' ? null : (
                  <Col span="8" key={config.tableKey}>
                    <FormItem
                      style={{ margin: '10px 0 0' }}
                      label={config.name}
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 12 }}
                    >
                      <Factory
                        type={config.type}
                        target={values}
                        keyName={config.tableKey}
                        onChange={onChange.inputOnChange} />
                    </FormItem>
                  </Col>
                )
            ))}
          </Row>
        </Form>
        <Row style={{ marginTop: 10 }}>
          <Col span="18" />
          <Button type="ghost" style={{ marginRight: 10 }} onClick={resetSearch}>
            <Icon type="cross" />
            重置
          </Button>
          <Button type="primary" onClick={submitSearch}>
            <Icon type="search" />
            搜索
          </Button>
        </Row>
      </div>
    );
  }
}

Search.propTypes = {
  configs: React.PropTypes.arrayOf(React.PropTypes.shape),
  values: React.PropTypes.objectOf(React.PropTypes.shape),
  onChange: React.PropTypes.objectOf(React.PropTypes.shape),
  submitSearch: React.PropTypes.func,
  resetSearch: React.PropTypes.func,
};
