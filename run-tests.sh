#!/bin/bash

echo "运行 Cypress E2E 测试..."
echo ""
echo "请确保所有服务都已启动："
echo "- 前端: http://localhost:3000"
echo "- 保单服务: http://localhost:8080"
echo "- 支付服务: http://localhost:8081"
echo "- 风险评估服务: http://localhost:8082"
echo ""
read -p "按 Enter 继续..."

cd e2e
npm run cy:run
cd ..


