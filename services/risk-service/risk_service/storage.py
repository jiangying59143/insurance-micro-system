from typing import List, Dict
from datetime import datetime

assessments_db: List[Dict] = []


def save_assessment(request_dict: Dict, assessment_dict: Dict) -> Dict:
    record = {
        "id": len(assessments_db) + 1,
        "timestamp": datetime.now().isoformat(),
        "request": request_dict,
        "assessment": assessment_dict,
    }
    assessments_db.append(record)
    return record


def get_all_assessments() -> Dict:
    return {"assessments": assessments_db, "total": len(assessments_db)}


def get_assessment_by_id(assessment_id: int) -> Dict:
    if assessment_id < 1 or assessment_id > len(assessments_db):
        return {}
    return assessments_db[assessment_id - 1]
