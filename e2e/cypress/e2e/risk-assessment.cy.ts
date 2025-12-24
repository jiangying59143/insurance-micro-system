describe('风险评估功能', () => {
  beforeEach(() => {
    cy.visit('/assessment');
    cy.wait(1000);
  });

  it('应该显示风险评估页面', () => {
    cy.contains('风险评估').should('be.visible');
    cy.get('h2').should('contain', '风险评估');
  });

  it('应该能够进行风险评估', () => {
    // 填写表单
    cy.get('[data-testid="age-input"]').clear().type('30');
    cy.get('[data-testid="health-condition-select"]').select('良好');
    cy.get('[data-testid="occupation-input"]').type('软件工程师');
    cy.get('[data-testid="coverage-amount-input"]').clear().type('100000');
    cy.get('[data-testid="policy-type-select"]').select('LIFE');
    
    // 提交评估
    cy.get('[data-testid="submit-assessment-button"]').click();
    
    // 等待评估结果
    cy.get('[data-testid="assessment-result"]').should('be.visible');
    
    // 验证结果包含必要信息
    cy.get('[data-testid="assessment-result"]').get('[class="result-grid"]').within(() => {
      cy.contains('风险评分').should('be.visible');
      cy.contains('风险等级').should('be.visible');
      cy.contains('推荐保费').should('be.visible');
      cy.contains('影响因素').should('be.visible');
    });
  });

  it('应该显示正确的风险等级', () => {
    // 使用低风险参数
    cy.get('[data-testid="age-input"]').clear().type('25');
    cy.get('[data-testid="health-condition-select"]').select('优秀');
    cy.get('[data-testid="occupation-input"]').type('教师');
    cy.get('[data-testid="coverage-amount-input"]').clear().type('50000');
    cy.get('[data-testid="policy-type-select"]').select('HEALTH');
    
    cy.get('[data-testid="submit-assessment-button"]').click();
    
    cy.get('[data-testid="assessment-result"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="assessment-result"]').should('contain', '风险等级');
  });

  it('表单验证应该工作', () => {
    // 尝试提交空表单
    cy.get('[data-testid="occupation-input"]').clear();
    cy.get('[data-testid="submit-assessment-button"]').click();
    
    // HTML5 验证应该阻止提交
    cy.get('[data-testid="occupation-input"]').then(($input) => {
      const htmlInput = $input[0] as HTMLInputElement;
      expect(htmlInput.validity.valid).to.be.false;
    });
  });
});


