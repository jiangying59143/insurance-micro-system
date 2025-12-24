package com.insurance.service;

import com.insurance.dto.PolicyRequest;
import com.insurance.model.Policy;
import com.insurance.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PolicyService {
    
    @Autowired
    private PolicyRepository policyRepository;
    
    public Policy createPolicy(PolicyRequest request) {
        Policy policy = new Policy();
        policy.setPolicyNumber(generatePolicyNumber());
        policy.setCustomerName(request.getCustomerName());
        policy.setCustomerId(request.getCustomerId());
        policy.setPolicyType(request.getPolicyType());
        policy.setPremium(request.getPremium());
        policy.setStartDate(request.getStartDate());
        policy.setEndDate(request.getEndDate());
        policy.setStatus(Policy.PolicyStatus.ACTIVE);
        
        return policyRepository.save(policy);
    }
    
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
    
    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }
    
    public Optional<Policy> getPolicyByNumber(String policyNumber) {
        return policyRepository.findByPolicyNumber(policyNumber);
    }
    
    public List<Policy> getPoliciesByCustomer(String customerId) {
        return policyRepository.findByCustomerId(customerId);
    }
    
    public Policy updatePolicyStatus(Long id, Policy.PolicyStatus status) {
        Policy policy = policyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("保单不存在"));
        policy.setStatus(status);
        return policyRepository.save(policy);
    }
    
    public void cancelPolicy(Long id) {
        Policy policy = policyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("保单不存在"));
        policy.setStatus(Policy.PolicyStatus.CANCELLED);
        policyRepository.save(policy);
    }
    
    private String generatePolicyNumber() {
        return "POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}


