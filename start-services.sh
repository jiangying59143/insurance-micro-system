#!/bin/bash

echo "启动微服务保险系统..."
echo ""

echo "[1/4] 启动 Java 保单服务 (端口 8080)..."
cd services/policy-service
if [ -f "./mvnw" ]; then
    chmod +x ./mvnw
    ./mvnw spring-boot:run &
else
    mvn spring-boot:run &
fi
POLICY_PID=$!
cd ../..
sleep 3

echo "[2/4] 启动 Go 支付服务 (端口 8081)..."
cd services/payment-service
go run main.go &
PAYMENT_PID=$!
cd ../..
sleep 3

echo "[3/4] 启动 Python 风险评估服务 (端口 8082)..."
cd services/risk-service
if command -v uvicorn &> /dev/null; then
    uvicorn main:app --reload --port 8082 &
else
    python -m uvicorn main:app --reload --port 8082 &
fi
RISK_PID=$!
cd ../..
sleep 3

echo "[4/4] 启动 React 前端 (端口 3000)..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "所有服务正在启动中..."
echo "请等待各服务完全启动后再运行测试"
echo ""
echo "服务地址:"
echo "- 前端: http://localhost:3000"
echo "- 保单服务: http://localhost:8080"
echo "- 支付服务: http://localhost:8081"
echo "- 风险评估服务: http://localhost:8082"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待所有后台进程
wait


