import React from 'react';
import { Input } from 'antd';

export default class Factory extends React.Component {
  render() {
    const { type, target, keyName, onChange } = this.props;
    switch (type) {
      case 'text':
        return <Input value={target[keyName]} onChange={e => onChange(e, keyName)} />;
      case 'display':
        return !target[keyName] ? <Input disabled /> : (
            <span>{target[keyName]}</span>
          );
      default:
        return null;
    }
  }
}

Factory.propTypes = {
  type: React.PropTypes.string,
  target: React.PropTypes.objectOf(React.PropTypes.shape),
  keyName: React.PropTypes.string,
  onChange: React.PropTypes.func,
};
