/* eslint import/prefer-default-export: 0 */

/**
 * 对含有对象的数组，通过 key 和 value 筛选 index
 * @param key {String}
 * @param val {String | Number | Boolean}
 * @param arr {Array}
 * @return {Number}
 */
export const findIndexByKey = (key, val, arr) => arr.findIndex(item => item[key] === val);
