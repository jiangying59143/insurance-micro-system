describe('支付管理功能', () => {
  beforeEach(() => {
    cy.visit('/payments');
    cy.wait(1000);
  });

  it('应该显示支付记录页面', () => {
    cy.contains('支付记录').should('be.visible');
    cy.get('h2').should('contain', '支付记录');
  });

  it('应该能够查看支付列表', () => {
    // 等待列表加载
    cy.wait(2000);
    
    // 检查是否有表格
    cy.get('table, .table').should('exist');
  });

  it('应该显示支付状态', () => {
    cy.wait(2000);
    
    // 如果表格存在，检查状态列
    cy.get('table').then(($table) => {
      if ($table.length > 0) {
        cy.get('table').within(() => {
          cy.contains('状态').should('be.visible');
        });
      }
    });
  });
});


