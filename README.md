# 微服务保险系统

一个使用 Java、Go、Python 实现的微服务保险系统，前端使用 React + TypeScript。

## 项目架构

- **Java (Spring Boot)**: 保单管理服务 (Policy Service) - 复杂业务逻辑处理
- **Go**: 支付服务 (Payment Service) - 高并发支付处理
- **Python (FastAPI)**: 风险评估服务 (Risk Assessment Service) - 数据分析和风险评估
- **React + TypeScript**: 前端应用
- **Cypress**: E2E 测试

## 项目结构

```
fullStack/
├── services/
│   ├── policy-service/        # Java Spring Boot 保单管理服务
│   ├── payment-service/       # Go 支付服务
│   └── risk-service/          # Python FastAPI 风险评估服务
├── frontend/                  # React + TypeScript 前端
├── e2e/                       # Cypress E2E 测试
└── README.md
```

## 启动说明

### 1. 启动后端服务

#### Java 保单服务 (端口 8080)
```bash
cd services/policy-service
./mvnw spring-boot:run
```

#### Go 支付服务 (端口 8081)
```bash
cd services/payment-service
go run main.go
```

#### Python 风险评估服务 (端口 8082)
```bash
cd services/risk-service
# 使用国内源安装依赖
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
uvicorn main:app --reload --port 8082
```

### 2. 启动前端
```bash
cd frontend
npm install
npm start
```

### 3. 运行 E2E 测试
```bash
cd e2e
npm install
npm run cy:run
```

## 使用国内源配置

项目已配置使用国内源以提高下载速度：

- **npm**: 使用淘宝镜像 (配置在 `.npmrc` 和 `e2e/.npmrc`)
- **Maven**: 使用阿里云镜像 (配置在 `pom.xml` 的 repositories)
- **Go**: 使用默认源（建议设置 `GOPROXY=https://goproxy.cn,direct`）
- **pip**: 使用清华大学镜像（在 `requirements.txt` 注释中说明）

### 快速启动（Windows）

运行 `start-services.bat` 启动所有服务。

### 快速启动（Linux/Mac）

运行 `chmod +x start-services.sh && ./start-services.sh` 启动所有服务。

### 运行测试（Windows）

运行 `run-tests.bat` 执行所有 Cypress 测试。

### 运行测试（Linux/Mac）

运行 `chmod +x run-tests.sh && ./run-tests.sh` 执行所有 Cypress 测试。

