# 风险评估服务 (Risk Assessment Service)

Python FastAPI 实现的风险评估服务，利用 Python 的数据分析和计算能力进行风险评估。

## 安装依赖

使用国内源安装：
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

## 启动服务

```bash
uvicorn main:app --reload --port 8082
```

或者：

```bash
python main.py
```

服务将在端口 8082 启动。

## API 端点

- POST /api/assessments - 进行风险评估
- GET /api/assessments - 获取所有评估记录
- GET /api/assessments/{id} - 根据ID获取评估记录
- GET /health - 健康检查

## 文档

启动服务后访问：
- Swagger UI: http://localhost:8082/docs
- ReDoc: http://localhost:8082/redoc


