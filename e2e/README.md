# Cypress E2E 测试

## 安装依赖

使用国内源安装（已在 .npmrc 配置）：

```bash
npm install
```

## 运行测试

### 打开 Cypress 测试运行器（交互式）

```bash
npm run cy:open
```

### 运行所有测试（无头模式）

```bash
npm run cy:run
```

## 测试前准备

确保所有服务都已启动：

1. **Java 保单服务** (端口 8080)
   ```bash
   cd ../services/policy-service
   ./mvnw spring-boot:run
   ```

2. **Go 支付服务** (端口 8081)
   ```bash
   cd ../services/payment-service
   go run main.go
   ```

3. **Python 风险评估服务** (端口 8082)
   ```bash
   cd ../services/risk-service
   uvicorn main:app --reload --port 8082
   ```

4. **React 前端** (端口 3000)
   ```bash
   cd ../frontend
   npm start
   ```

## 测试用例

- `policy-management.cy.ts` - 保单管理功能测试
- `payment-management.cy.ts` - 支付管理功能测试
- `risk-assessment.cy.ts` - 风险评估功能测试
- `navigation.cy.ts` - 导航功能测试
- `integration.cy.ts` - 系统集成测试


