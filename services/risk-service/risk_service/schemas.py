from pydantic import BaseModel, Field
from typing import List


class RiskAssessmentRequest(BaseModel):
    age: int = Field(..., gt=0, le=120, description="年龄")
    health_condition: str = Field(..., description="健康状况")
    occupation: str = Field(..., description="职业")
    coverage_amount: float = Field(..., gt=0, description="保额")
    policy_type: str = Field(..., description="保单类型")


class RiskAssessmentResponse(BaseModel):
    risk_score: float = Field(..., ge=0, le=100, description="风险评分")
    risk_level: str = Field(..., description="风险等级")
    recommended_premium: float = Field(..., description="推荐保费")
    factors: List[str] = Field(..., description="影响因素")
