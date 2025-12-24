import React, { useState, useEffect } from 'react';
import { paymentAPI, Payment } from '../services/api';
import '../App.css';

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newPayment, setNewPayment] = useState({ policyId: '', amount: 0, paymentMethod: 'CARD' });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.get('/');
      setPayments(response.data);
      setError(null);
    } catch (err: any) {
      setError('获取支付记录失败: ' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const payload = {
        policyId: newPayment.policyId,
        amount: newPayment.amount,
        paymentMethod: newPayment.paymentMethod,
      };
      const resp = await paymentAPI.post('/', payload);
      // 添加到列表或重新获取
      await fetchPayments();
      setNewPayment({ policyId: '', amount: 0, paymentMethod: 'CARD' });
      setError(null);
    } catch (err: any) {
      setError('创建支付失败: ' + (err.response?.data || err.message || '未知错误'));
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="card">
      <h2>支付记录</h2>

      <form onSubmit={handleCreatePayment} style={{ marginBottom: '1rem' }} data-testid="create-payment-form">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            name="policyId"
            placeholder="保单ID"
            value={newPayment.policyId}
            onChange={handleCreateChange}
            required
            data-testid="create-policyId"
            style={{ padding: '0.5rem', flex: 1 }}
          />
          <input
            type="number"
            name="amount"
            placeholder="金额"
            value={newPayment.amount}
            onChange={handleCreateChange}
            min={0}
            required
            data-testid="create-amount"
            style={{ padding: '0.5rem', width: '140px' }}
          />
          <select name="paymentMethod" value={newPayment.paymentMethod} onChange={handleCreateChange} data-testid="create-method" className="payment-method-select" title="选择支付方式">
            <option value="CARD">CARD</option>
            <option value="BANK_TRANSFER">BANK_TRANSFER</option>
            <option value="CASH">CASH</option>
          </select>
          <button className="btn btn-primary" type="submit" disabled={creating} data-testid="create-payment-button">
            {creating ? '创建中...' : '创建支付'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {payments.length === 0 ? (
        <p>暂无支付记录</p>
      ) : (
        <table className="table" data-testid="payment-table">
          <thead>
            <tr>
              <th>支付ID</th>
              <th>保单ID</th>
              <th>金额</th>
              <th>支付方式</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>处理时间</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} data-testid={`payment-${payment.id}`}>
                <td>{payment.id}</td>
                <td>{payment.policyId}</td>
                <td>¥{payment.amount.toFixed(2)}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${payment.status === 'COMPLETED' ? 'status-active' : 'status-expired'}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                <td>{payment.processedAt ? new Date(payment.processedAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentList;


