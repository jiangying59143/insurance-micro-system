describe('保单管理功能', () => {
  beforeEach(() => {
    // 访问首页
    cy.visit('/');
    // 等待页面加载
    cy.wait(1000);
  });

  it('应该显示保单列表页面', () => {
    cy.contains('保单列表').should('be.visible');
    cy.get('h2').should('contain', '保单列表');
  });

  it('应该能够导航到创建保单页面', () => {
    cy.contains('创建保单').click();
    cy.url().should('include', '/create');
    cy.get('h2').should('contain', '创建新保单');
  });

  it('应该能够创建新保单', () => {
    // 导航到创建页面
    cy.contains('创建保单').click();
    
    // 填写表单
    cy.get('[data-testid="customer-name-input"]').type('张三');
    cy.get('[data-testid="customer-id-input"]').type('C001');
    cy.get('[data-testid="policy-type-select"]').select('LIFE');
    cy.get('[data-testid="premium-input"]').clear().type('5000');
    
    // 设置日期（今天和一年后）
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    cy.get('[data-testid="start-date-input"]').type(formatDate(today));
    cy.get('[data-testid="end-date-input"]').type(formatDate(nextYear));
    
    // 提交表单
    cy.get('[data-testid="submit-policy-button"]').click();
    
    // 验证成功消息
    cy.contains('保单创建成功', { timeout: 10000 }).should('be.visible');
    
    // 应该自动跳转到列表页面
    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');
  });

  it('应该能够查看保单列表', () => {
    // 确保在列表页面
    cy.visit('/');
    
    // 等待列表加载
    cy.wait(2000);
    
    // 检查是否有表格或列表
    cy.get('table, .table').should('exist');
  });

  it('应该能够取消保单', () => {
    // 首先创建一个保单
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    cy.createPolicy({
      customerName: '测试客户',
      customerId: 'TEST001',
      policyType: 'HEALTH',
      premium: 3000,
      startDate: formatDate(today),
      endDate: formatDate(nextYear),
    }).then((response) => {
      const policyId = response.body.id;
      
      // 刷新页面查看列表
      cy.visit('/');
      cy.wait(2000);
      
      // 设置确认对话框 stub
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
      });
      
      // 查找并点击取消按钮
      cy.get(`[data-testid="cancel-policy-${policyId}"]`).should('exist').click();
      
      // 等待取消完成
      cy.wait(1000);
    });
  });

  it('表单验证应该工作', () => {
    cy.contains('创建保单').click();
    
    // 尝试提交空表单
    cy.get('[data-testid="submit-policy-button"]').click();
    
    // HTML5 验证应该阻止提交
    cy.get('[data-testid="customer-name-input"]').then(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
  });
});

