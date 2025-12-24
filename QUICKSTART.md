# 快速开始指南

## 前置要求

- **Java 17+** - 用于保单服务
- **Go 1.21+** - 用于支付服务
- **Python 3.8+** - 用于风险评估服务
- **Node.js 16+** 和 **npm** - 用于前端和测试

## 一键启动所有服务

### Windows

```bash
start-services.bat
```

### Linux/Mac

```bash
chmod +x start-services.sh
./start-services.sh
```

## 手动启动服务

### 1. 启动 Java 保单服务 (端口 8080)

```bash
cd services/policy-service

# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run

# 或者使用系统 Maven（如果已安装）
mvn spring-boot:run
```

### 2. 启动 Go 支付服务 (端口 8081)

```bash
cd services/payment-service
go mod download
go run main.go
```

### 3. 启动 Python 风险评估服务 (端口 8082)

```bash
cd services/risk-service

# 使用国内源安装依赖
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

# 启动服务
uvicorn main:app --reload --port 8082

# 或者
python main.py
```

### 4. 启动前端 (端口 3000)

```bash
cd frontend
npm install
npm start
```

前端会自动在浏览器中打开 `http://localhost:3000`

## 运行 E2E 测试

### 前置条件

确保所有服务都已启动并在运行：
- 前端: http://localhost:3000
- 保单服务: http://localhost:8080
- 支付服务: http://localhost:8081
- 风险评估服务: http://localhost:8082

### 运行测试

#### Windows

```bash
run-tests.bat
```

#### Linux/Mac

```bash
chmod +x run-tests.sh
./run-tests.sh
```

#### 手动运行

```bash
cd e2e
npm install
npm run cy:run
```

#### 交互式运行（推荐用于开发调试）

```bash
cd e2e
npm install
npm run cy:open
```

## 验证服务运行状态

### 检查各服务健康状态

```bash
# 保单服务（应该返回 404 或空数组，表示服务运行）
curl http://localhost:8080/api/policies

# 支付服务
curl http://localhost:8081/health

# 风险评估服务
curl http://localhost:8082/health
```

## 常见问题

### 1. Java 服务启动失败

- 确保安装了 Java 17 或更高版本
- 检查 JAVA_HOME 环境变量
- 如果使用 Maven wrapper，确保 `mvnw` 或 `mvnw.cmd` 有执行权限

### 2. Go 服务启动失败

- 确保 Go 版本 >= 1.21
- 运行 `go mod download` 下载依赖

### 3. Python 服务启动失败

- 确保 Python 版本 >= 3.8
- 如果 pip 安装失败，尝试使用国内镜像：
  ```bash
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
  ```

### 4. 前端启动失败

- 确保 Node.js 版本 >= 16
- 删除 `node_modules` 和 `package-lock.json`，然后重新运行 `npm install`
- 如果下载慢，项目已配置使用淘宝镜像

### 5. Cypress 测试失败

- 确保所有服务都已启动
- 检查服务端口是否被占用
- 查看 Cypress 视频和截图了解失败原因
- 尝试增加超时时间（在 `cypress.config.ts` 中）

## 测试覆盖的功能

Cypress 测试用例覆盖以下功能：

1. **保单管理** (`policy-management.cy.ts`)
   - 查看保单列表
   - 创建新保单
   - 取消保单
   - 表单验证

2. **支付管理** (`payment-management.cy.ts`)
   - 查看支付记录
   - 支付状态显示

3. **风险评估** (`risk-assessment.cy.ts`)
   - 进行风险评估
   - 查看评估结果
   - 表单验证

4. **导航功能** (`navigation.cy.ts`)
   - 页面导航
   - 导航栏功能

5. **系统集成** (`integration.cy.ts`)
   - 完整业务流程
   - 服务健康检查

## 项目架构说明

- **Java (Spring Boot)**: 保单管理服务 - 处理复杂的业务逻辑和数据持久化
- **Go**: 支付服务 - 利用 Go 的高并发特性处理支付请求
- **Python (FastAPI)**: 风险评估服务 - 利用 Python 的数据处理能力进行风险评估计算
- **React + TypeScript**: 前端应用 - 提供用户界面
- **Cypress**: E2E 测试框架 - 确保端到端功能正常

## 使用国内源

项目已配置使用国内镜像源以加速下载：

- **npm**: 淘宝镜像 (`.npmrc`)
- **Maven**: 阿里云镜像 (`pom.xml`)
- **pip**: 清华大学镜像（在 `requirements.txt` 注释中说明）

