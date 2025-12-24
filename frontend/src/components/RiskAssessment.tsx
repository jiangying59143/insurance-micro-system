import React, { useState } from 'react';
import { riskAPI, RiskAssessmentRequest, RiskAssessmentResponse } from '../services/api';
import '../App.css';

interface RiskFormData {
  age: number | string;
  healthCondition: string;
  occupation: string;
  coverageAmount: number;
  policyType: string;
}

const RiskAssessment: React.FC = () => {
  const [formData, setFormData] = useState<RiskFormData>({
    age: '',
    healthCondition: 'GOOD',
    occupation: '',
    coverageAmount: 100000,
    policyType: 'LIFE',
  });
  const [assessment, setAssessment] = useState<RiskAssessmentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' 
        ? (value === '' ? '' : parseInt(value) || 0)
        : name === 'coverageAmount' 
          ? parseInt(value) || 0 
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAssessment(null);

    // 确保年龄是数字类型
    const ageValue = typeof formData.age === 'string' ? parseInt(formData.age) || 0 : formData.age;

    try {
      const response = await riskAPI.post('/assessments', {
        age: ageValue,
        health_condition: formData.healthCondition,
        occupation: formData.occupation,
        coverage_amount: formData.coverageAmount,
        policy_type: formData.policyType,
      });
      // 后端返回 snake_case 字段，映射为前端 camelCase
      const resp = response.data || {};
      const mapped = {
        riskScore: resp.risk_score ?? resp.riskScore,
        riskLevel: resp.risk_level ?? resp.riskLevel,
        recommendedPremium: resp.recommended_premium ?? resp.recommendedPremium,
        factors: resp.factors ?? resp.factors ?? [],
      } as any;
      setAssessment(mapped);
    } catch (err: any) {
      setError('风险评估失败: ' + (err.response?.data?.detail || err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelClass = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'status-active';
      case 'MEDIUM':
        return 'status-expired';
      case 'HIGH':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="card">
      <h2>风险评估</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} data-testid="risk-assessment-form">
        <div className="form-group">
          <label htmlFor="age">年龄 *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            required
            data-testid="age-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="healthCondition">健康状况 *</label>
          <select
            id="healthCondition"
            name="healthCondition"
            value={formData.healthCondition}
            onChange={handleChange}
            required
            data-testid="health-condition-select"
          >
            <option value="EXCELLENT">优秀</option>
            <option value="GOOD">良好</option>
            <option value="FAIR">一般</option>
            <option value="POOR">较差</option>
            <option value="CRITICAL">严重</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="occupation">职业 *</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            data-testid="occupation-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverageAmount">保额 (¥) *</label>
          <input
            type="number"
            id="coverageAmount"
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleChange}
            min="1"
            required
            data-testid="coverage-amount-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="policyType">保单类型 *</label>
          <select
            id="policyType"
            name="policyType"
            value={formData.policyType}
            onChange={handleChange}
            required
            data-testid="policy-type-select"
          >
            <option value="LIFE">人寿保险</option>
            <option value="HEALTH">健康保险</option>
            <option value="AUTO">汽车保险</option>
            <option value="PROPERTY">财产保险</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          data-testid="submit-assessment-button"
        >
          {loading ? '评估中...' : '开始评估'}
        </button>
      </form>

      {assessment && (
        <div className="card" style={{ marginTop: '2rem' }} data-testid="assessment-result">
          <h3>评估结果</h3>
          <div style={{ marginTop: '1rem' }} className="result-grid">
            <div className="result-row">
              <div className="label">风险评分:</div>
              <div className="value">{assessment.riskScore}</div>
            </div>

            <div className="result-row">
              <div className="label">风险等级:</div>
              <div className="value">
                <span className={`status-badge ${getRiskLevelClass(assessment.riskLevel)}`}>
                  {assessment.riskLevel}
                </span>
              </div>
            </div>

            <div className="result-row">
              <div className="label">推荐保费:</div>
              <div className="value">¥{
                typeof assessment.recommendedPremium === 'number'
                  ? assessment.recommendedPremium.toFixed(2)
                  : '-'
              }</div>
            </div>

            <div className="result-row">
              <div className="label">影响因素:</div>
              <div className="value">
                <textarea
                  readOnly
                  disabled
                  className="factors-textarea"
                  data-testid="factors-textarea"
                  value={(assessment.factors || []).join('\n')}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;


