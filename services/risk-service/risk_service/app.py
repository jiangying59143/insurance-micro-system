import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import core, storage, schemas

logger = logging.getLogger("uvicorn.error")


def create_app() -> FastAPI:
    app = FastAPI(title="风险评估服务", description="保险风险评估微服务")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    async def health_check():
        return {"status": "ok", "service": "risk-assessment-service"}

    @app.post("/api/assessments", response_model=schemas.RiskAssessmentResponse)
    async def assess_risk(request: schemas.RiskAssessmentRequest):
        risk_score = core.calculate_risk_score(request)

        if risk_score < 30:
            risk_level = "LOW"
        elif risk_score < 70:
            risk_level = "MEDIUM"
        else:
            risk_level = "HIGH"

        base_rate = 0.02
        risk_multiplier = 1 + (risk_score / 100)
        recommended_premium = request.coverage_amount * base_rate * risk_multiplier

        factors = core.identify_risk_factors(request, risk_score)

        assessment = schemas.RiskAssessmentResponse(
            risk_score=round(risk_score, 2),
            risk_level=risk_level,
            recommended_premium=round(recommended_premium, 2),
            factors=factors,
        )

        storage.save_assessment(request.dict(), assessment.dict())
        logger.info("评估结果：%s", assessment.json())
        return assessment

    @app.get("/api/assessments")
    async def get_all_assessments():
        return storage.get_all_assessments()

    @app.get("/api/assessments/{assessment_id}")
    async def get_assessment(assessment_id: int):
        record = storage.get_assessment_by_id(assessment_id)
        if not record:
            raise HTTPException(status_code=404, detail="评估记录不存在")
        return record

    return app


app = create_app()
