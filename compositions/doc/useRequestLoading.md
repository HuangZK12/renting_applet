# useRequestLoading 函数说明

loading 辅助函数，Promise 适用于请求需要加载操作

```javascript
import { useRequestLoading } from '@/utils/request'

// 示例
const fetchData = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: params })
    }, 1000)
  })
}

useRequestLoading(
  fetchData,
  { name: 'hzk' },
  {
    handle: '获取数据',
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
      console.log(err)
    },
    finish: () => {
      console.log('finish')
    },
    tip: true
  }
)
```

## 参数说明

| 参数           | 说明             | 类型     | 默认值 |
| -------------- | ---------------- | -------- | ------ |
| api            | 请求方法         | Function | -      |
| params         | 请求参数         | Object   | -      |
| option         | 配置项           | Object   | -      |
| option.handle  | 操作名称         | String   | 操作   |
| option.success | 成功回调         | Function | null   |
| option.finish  | 完成回调         | Function | null   |
| option.error   | 失败回调         | Function | null   |
| option.tip     | 是否显示提示信息 | Boolean  | true   |
