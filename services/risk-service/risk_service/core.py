from typing import List
from .schemas import RiskAssessmentRequest


def calculate_risk_score(request: RiskAssessmentRequest) -> float:
    """
    计算风险评分（0-100）
    """
    score = 0.0

    # 年龄因素
    if request.age < 25:
        score += 15
    elif request.age < 35:
        score += 10
    elif request.age < 50:
        score += 20
    elif request.age < 65:
        score += 35
    else:
        score += 50

    # 健康状况因素
    health_scores = {
        "EXCELLENT": 5,
        "GOOD": 15,
        "FAIR": 35,
        "POOR": 60,
        "CRITICAL": 85,
    }
    score += health_scores.get(request.health_condition.upper(), 30)

    # 职业因素
    high_risk_occupations = ["飞行员", "消防员", "建筑工人", "矿工"]
    medium_risk_occupations = ["司机", "警察", "医生"]

    if request.occupation in high_risk_occupations:
        score += 25
    elif request.occupation in medium_risk_occupations:
        score += 15
    else:
        score += 5

    # 保单类型因素
    if request.policy_type.upper() == "LIFE":
        score += 10
    elif request.policy_type.upper() == "HEALTH":
        score += 5

    # 保额因素
    if request.coverage_amount > 1000000:
        score += 15
    elif request.coverage_amount > 500000:
        score += 8

    return min(score, 100.0)


def identify_risk_factors(request: RiskAssessmentRequest, risk_score: float) -> List[str]:
    """
    识别主要风险因素
    """
    factors: List[str] = []

    if request.age >= 65:
        factors.append("高龄风险")
    elif request.age < 25:
        factors.append("年龄偏小")

    if request.health_condition.upper() in ["POOR", "CRITICAL"]:
        factors.append("健康状况不佳")

    high_risk_occupations = ["飞行员", "消防员", "建筑工人", "矿工"]
    if request.occupation in high_risk_occupations:
        factors.append("高风险职业")

    if request.coverage_amount > 1000000:
        factors.append("高保额")

    if risk_score >= 70:
        factors.append("综合风险偏高")
    elif risk_score < 30:
        factors.append("低风险客户")

    return factors if factors else ["标准风险"]
