import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { policyAPI, PolicyRequest } from '../services/api';
import '../App.css';

const PolicyCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PolicyRequest>({
    customerName: '',
    customerId: '',
    policyType: 'LIFE',
    premium: 0,
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'premium' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await policyAPI.post('/', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      setError('创建保单失败: ' + (err.response?.data?.message || err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>创建新保单</h2>

      {success && (
        <div className="alert alert-success">
          保单创建成功！正在跳转...
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} data-testid="policy-create-form">
        <div className="form-group">
          <label htmlFor="customerName">客户姓名 *</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            data-testid="customer-name-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerId">客户ID *</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            data-testid="customer-id-input"
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

        <div className="form-group">
          <label htmlFor="premium">保费 (¥) *</label>
          <input
            type="number"
            id="premium"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            data-testid="premium-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">开始日期 *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            data-testid="start-date-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">结束日期 *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            data-testid="end-date-input"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          data-testid="submit-policy-button"
        >
          {loading ? '创建中...' : '创建保单'}
        </button>
      </form>
    </div>
  );
};

export default PolicyCreate;


