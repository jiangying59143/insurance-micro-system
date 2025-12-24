package com.insurance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "policies")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String policyNumber;
    
    @NotBlank
    @Column(nullable = false)
    private String customerName;
    
    @NotBlank
    @Column(nullable = false)
    private String customerId;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PolicyType policyType;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal premium;
    
    @NotNull
    @Column(nullable = false)
    private LocalDate startDate;
    
    @NotNull
    @Column(nullable = false)
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PolicyStatus status = PolicyStatus.ACTIVE;
    
    public enum PolicyType {
        LIFE, HEALTH, AUTO, PROPERTY
    }
    
    public enum PolicyStatus {
        ACTIVE, EXPIRED, CANCELLED
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPolicyNumber() {
        return policyNumber;
    }
    
    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }
    
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
    
    public PolicyType getPolicyType() {
        return policyType;
    }
    
    public void setPolicyType(PolicyType policyType) {
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
    
    public PolicyStatus getStatus() {
        return status;
    }
    
    public void setStatus(PolicyStatus status) {
        this.status = status;
    }
}


