"""
Launcher for risk-service; keep this file minimal after refactor.
"""
from risk_service.app import app
import uvicorn

if __name__ == "__main__":
    

    uvicorn.run(app, host="0.0.0.0", port=8082, log_level="info")

