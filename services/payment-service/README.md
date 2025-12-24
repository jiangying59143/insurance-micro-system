# 支付服务 (Payment Service)

Go 实现的支付服务，利用 Go 的高并发特性处理支付请求。

## 启动

```bash
go mod download
go run main.go
```

服务将在端口 8081 启动。

## API 端点

- POST /api/payments - 创建支付
- GET /api/payments - 获取所有支付
- GET /api/payments/{id} - 根据ID获取支付
- GET /api/payments/policy/{policyId} - 根据保单ID获取支付列表
- GET /health - 健康检查


