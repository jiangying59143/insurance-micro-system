package com.insurance.dto;

import com.insurance.model.Policy;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PolicyRequest {
    @NotBlank(message = "客户姓名不能为空")
    private String customerName;
    
    @NotBlank(message = "客户ID不能为空")
    private String customerId;
    
    @NotNull(message = "保单类型不能为空")
    private Policy.PolicyType policyType;
    
    @NotNull(message = "保费不能为空")
    @DecimalMin(value = "0.0", inclusive = false, message = "保费必须大于0")
    private BigDecimal premium;
    
    @NotNull(message = "开始日期不能为空")
    private LocalDate startDate;
    
    @NotNull(message = "结束日期不能为空")
    private LocalDate endDate;
    
    // Getters and Setters
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    
    public Policy.PolicyType getPolicyType() {
        return policyType;
    }
    
    public void setPolicyType(Policy.PolicyType policyType) {
        this.policyType = policyType;
    }
    
    public BigDecimal getPremium() {
        return premium;
    }
    
    public void setPremium(BigDecimal premium) {
        this.premium = premium;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}


