import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL || 'http://localhost:8081';
const RISK_API_URL = process.env.REACT_APP_RISK_API_URL || 'http://localhost:8082';

// 保单 API
export const policyAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/policies`,
});

// 移除 URL 末尾的斜杠以避免 404 错误
policyAPI.interceptors.request.use((config) => {
  // 移除 baseURL 末尾的斜杠（如果存在）
  if (config.baseURL && config.baseURL.endsWith('/')) {
    config.baseURL = config.baseURL.slice(0, -1);
  }
  // 如果 url 是单独的 '/'，移除它以避免产生尾部斜杠
  if (config.url === '/' && config.baseURL) {
    config.url = '';
  } else if (config.url && config.url.startsWith('/') && config.url.length > 1 && config.url.endsWith('/')) {
    config.url = config.url.slice(0, -1);
  }
  return config;
});

// 支付 API
export const paymentAPI = axios.create({
  baseURL: `${PAYMENT_API_URL}/api/payments`,
});

// 风险评估 API
export const riskAPI = axios.create({
  baseURL: `${RISK_API_URL}/api`,
});

// 类型定义
export interface Policy {
  id: number;
  policyNumber: string;
  customerName: string;
  customerId: string;
  policyType: 'LIFE' | 'HEALTH' | 'AUTO' | 'PROPERTY';
  premium: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

export interface PolicyRequest {
  customerName: string;
  customerId: string;
  policyType: 'LIFE' | 'HEALTH' | 'AUTO' | 'PROPERTY';
  premium: number;
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  policyId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  processedAt?: string;
}

export interface PaymentRequest {
  policyId: string;
  amount: number;
  paymentMethod: string;
}

export interface RiskAssessmentRequest {
  age: number;
  healthCondition: string;
  occupation: string;
  coverageAmount: number;
  policyType: string;
}

export interface RiskAssessmentResponse {
  riskScore: number;
  riskLevel: string;
  recommendedPremium: number;
  factors: string[];
}


