# useRequest函数说明

适用于数据渲染等操作，返回响应式数据，loading状态，请求方法，请求参数，请求头，请求成功，失败，结束的回调

```js
const { data, loading, total, page, search, reset, handleFetch } = fetchData(fetch, {
	params:{keyword},
})
```

## 数据
- data 响应式数组，用于渲染表格
- loading
- total 总数
- page 对象，包含pageNo和pageSize
## 函数
- search 重置页码第一页，带params搜索，直接用于search-button组件search方法
- reset 清除所有的params进行搜索。如果有不需要清清除的不适用
- handleFetch 请求方法
## 参数
- fetch 请求方法
- params = {},  参数集合,不需要页码
- pageNo = 1,  参数:pageNo,默认1
- pageSize = 10,  参数:pageSize,默认10
- usePage = true,  参数:usePage,是否参数带页码
- header = {},  请求头额外参数,默认{}
- success = null,  请求成功的回调,回调参数:请求成功的数据
- error = null,  请求失败的回调,回调参数:请求失败的数据
- finish = null,  请求结束的回调,回调参数:请求结束的数据