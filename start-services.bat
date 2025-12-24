@echo off
echo 启动微服务保险系统...
echo.

echo [1/4] 启动 Java 保单服务 (端口 8080)...
start "Policy Service" cmd /k "cd services\policy-service && mvnw.cmd spring-boot:run || mvn spring-boot:run"
timeout /t 3 >nul

echo [2/4] 启动 Go 支付服务 (端口 8081)...
start "Payment Service" cmd /k "cd services\payment-service && go run main.go"
timeout /t 3 >nul

echo [3/4] 启动 Python 风险评估服务 (端口 8082)...
start "Risk Service" cmd /k "cd services\risk-service && python -m uvicorn main:app --reload --port 8082"
timeout /t 3 >nul

echo [4/4] 启动 React 前端 (端口 3000)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo 所有服务正在启动中...
echo 请等待各服务完全启动后再运行测试
echo.
echo 服务地址:
echo - 前端: http://localhost:3000
echo - 保单服务: http://localhost:8080
echo - 支付服务: http://localhost:8081
echo - 风险评估服务: http://localhost:8082
echo.
pause


