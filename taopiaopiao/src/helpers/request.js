/*
 * @Author: lemonIceRedTea
 * @Des: fetch 请求 包装 处理
 * @Date: 2018-08-24 16:59:13
 * @Last Modified by: lemonIceRedTea
 * @Last Modified time: 2018-08-29 20:43:29
 */
//city comment seat index 可用path
//basePath www.easy-mock.com/mock/5a964cffdd997801d1e291fe/movie
export default async function (path, opt) {
  const url = "https://www.easy-mock.com/mock/5a964cffdd997801d1e291fe/movie" + path;
  const options = Object.assign({
    method: 'GET'
  }, opt);
  try {

    const { data, status } = await fetch(url, options).then(response => response.json());
    if (status === 0) {
      return data;
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
