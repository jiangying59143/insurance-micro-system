import React, { useState, useEffect } from 'react';
import { policyAPI, Policy } from '../services/api';
import '../App.css';

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await policyAPI.get('/');
      setPolicies(response.data);
      setError(null);
    } catch (err: any) {
      setError('获取保单列表失败: ' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPolicy = async (id: number) => {
    if (!window.confirm('确定要取消此保单吗？')) {
      return;
    }

    try {
      await policyAPI.delete(`/${id}`);
      fetchPolicies();
    } catch (err: any) {
      alert('取消保单失败: ' + (err.message || '未知错误'));
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';
      case 'EXPIRED':
        return 'status-expired';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="card">
      <h2>保单列表</h2>
      
      {error && <div className="alert alert-error">{error}</div>}

      {policies.length === 0 ? (
        <p>暂无保单记录</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>保单号</th>
              <th>客户姓名</th>
              <th>客户ID</th>
              <th>保单类型</th>
              <th>保费</th>
              <th>开始日期</th>
              <th>结束日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id} data-testid={`policy-${policy.id}`}>
                <td>{policy.policyNumber}</td>
                <td>{policy.customerName}</td>
                <td>{policy.customerId}</td>
                <td>{policy.policyType}</td>
                <td>¥{policy.premium.toFixed(2)}</td>
                <td>{new Date(policy.startDate).toLocaleDateString()}</td>
                <td>{new Date(policy.endDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(policy.status)}`}>
                    {policy.status}
                  </span>
                </td>
                <td>
                  {policy.status === 'ACTIVE' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelPolicy(policy.id)}
                      data-testid={`cancel-policy-${policy.id}`}
                    >
                      取消
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PolicyList;


