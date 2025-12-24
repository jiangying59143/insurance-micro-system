describe('导航功能', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('应该能够导航到所有主要页面', () => {
    // 检查导航栏存在
    cy.contains('保险系统').should('be.visible');
    
    // 导航到创建保单页面
    cy.contains('创建保单').click();
    cy.url().should('include', '/create');
    cy.get('h2').should('contain', '创建新保单');
    
    // 导航到支付记录页面
    cy.contains('支付记录').click();
    cy.url().should('include', '/payments');
    cy.get('h2').should('contain', '支付记录');
    
    // 导航到风险评估页面
    cy.contains('风险评估').click();
    cy.url().should('include', '/assessment');
    cy.get('h2').should('contain', '风险评估');
    
    // 导航回保单列表
    cy.contains('保单列表').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('h2').should('contain', '保单列表');
  });

  it('导航栏应该始终可见', () => {
    cy.get('.navbar').should('be.visible');
    cy.contains('保险系统').should('be.visible');
    
    // 导航到其他页面，导航栏应该仍然可见
    cy.contains('创建保单').click();
    cy.get('.navbar').should('be.visible');
    
    cy.contains('支付记录').click();
    cy.get('.navbar').should('be.visible');
  });
});


