/// <reference types="cypress" />

// 自定义命令
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 等待后端服务就绪
       */
      waitForServices(): Chainable<void>
      
      /**
       * 创建保单
       */
      createPolicy(policy: {
        customerName: string;
        customerId: string;
        policyType: string;
        premium: number;
        startDate: string;
        endDate: string;
      }): Chainable<any>
    }
  }
}

Cypress.Commands.add('waitForServices', () => {
  // 等待所有服务启动
  cy.request({
    url: 'http://localhost:8080/actuator/health',
    failOnStatusCode: false,
  });
  cy.request({
    url: 'http://localhost:8081/health',
    failOnStatusCode: false,
  });
  cy.request({
    url: 'http://localhost:8082/health',
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('createPolicy', (policy) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/policies',
    body: policy,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

export {};


