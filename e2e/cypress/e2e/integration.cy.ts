/// <reference types="cypress" />

// 使用 Cypress 内置重试：发起请求并在非期望状态时抛出错误触发重试
const waitForService = (url: string, okStatuses: number[] = [200, 404], timeout = 30000) => {
  return cy
    .request({ method: 'GET', url, failOnStatusCode: false, timeout })
    .its('status')
    .should((status) => {
      if (!okStatuses.includes(status)) {
        throw new Error(`服务未就绪，状态码: ${status}，期望值: ${okStatuses.join(', ')}`);
      }
    })
    .then((status) => cy.log(`服务 ${url} 已就绪，状态码: ${status}`));
};

describe('系统集成测试', () => {
  before(() => {
    cy.log('等待后端服务就绪...');
    cy.wrap(null)
      .then(() => waitForService('http://localhost:8080/api/policies', [200, 404], 30000))
      .then(() => waitForService('http://localhost:8081/health', [200], 30000))
      .then(() => waitForService('http://localhost:8082/health', [200], 30000));
  });

    it('应该能够完成完整的保险流程', () => {
      // 1. 创建保单
      cy.visit('/create');
      cy.wait(1000);
      
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(today.getFullYear() + 1);
      
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      cy.get('[data-testid="customer-name-input"]').type('集成测试客户');
      cy.get('[data-testid="customer-id-input"]').type('INT001');
      cy.get('[data-testid="policy-type-select"]').select('AUTO');
      cy.get('[data-testid="premium-input"]').clear().type('4000');
      cy.get('[data-testid="start-date-input"]').type(formatDate(today));
      cy.get('[data-testid="end-date-input"]').type(formatDate(nextYear));
      
      cy.get('[data-testid="submit-policy-button"]').click();
      cy.contains('保单创建成功', { timeout: 10000 }).should('be.visible');
      
      // 2. 查看保单列表
      cy.wait(2000);
      cy.url().should('eq', 'http://localhost:3000/');
      cy.get('table, .table').should('exist');
      
      // 3. 进行风险评估
      cy.contains('风险评估').click();
      cy.wait(1000);
      
      cy.get('[data-testid="age-input"]').clear().type('35');
      cy.get('[data-testid="health-condition-select"]').select('GOOD');
      cy.get('[data-testid="occupation-input"]').type('司机');
      cy.get('[data-testid="coverage-amount-input"]').clear().type('200000');
      cy.get('[data-testid="policy-type-select"]').select('AUTO');
      
      cy.get('[data-testid="submit-assessment-button"]').click();
      cy.get('[data-testid="assessment-result"]', { timeout: 10000 }).should('be.visible');
      
      // 4. 查看支付记录
      cy.contains('支付记录').click();
      cy.wait(1000);
      cy.get('h2').should('contain', '支付记录');

      cy.get('[data-testid="create-policyId"]').type('INT001');
      cy.get('[data-testid="create-amount"]').type('4000');
      cy.get('[data-testid="create-method"]').select('CASH');
      cy.get('[data-testid="create-payment-button"]').click();

      cy.get('[data-testid="payment-table"]', { timeout: 10000 }).should('be.visible');
    });

    it('所有后端服务应该响应', () => {
      // 检查保单服务
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/api/policies',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]); // 404 表示服务运行但无数据
      });
      
      // 检查支付服务
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/health',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      
      // 检查风险评估服务
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/health',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
