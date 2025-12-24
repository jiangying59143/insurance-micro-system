package com.insurance.controller;

import com.insurance.dto.PolicyRequest;
import com.insurance.model.Policy;
import com.insurance.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "*")
public class PolicyController {
    
    @Autowired
    private PolicyService policyService;
    
    @PostMapping
    public ResponseEntity<Policy> createPolicy(@Valid @RequestBody PolicyRequest request) {
        Policy policy = policyService.createPolicy(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(policy);
    }
    
    @GetMapping
    public ResponseEntity<List<Policy>> getAllPolicies() {
        List<Policy> policies = policyService.getAllPolicies();
        return ResponseEntity.ok(policies);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id)
            .map(policy -> ResponseEntity.ok(policy))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/number/{policyNumber}")
    public ResponseEntity<Policy> getPolicyByNumber(@PathVariable String policyNumber) {
        return policyService.getPolicyByNumber(policyNumber)
            .map(policy -> ResponseEntity.ok(policy))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Policy>> getPoliciesByCustomer(@PathVariable String customerId) {
        List<Policy> policies = policyService.getPoliciesByCustomer(customerId);
        return ResponseEntity.ok(policies);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Policy> updatePolicyStatus(
            @PathVariable Long id,
            @RequestParam Policy.PolicyStatus status) {
        Policy policy = policyService.updatePolicyStatus(id, status);
        return ResponseEntity.ok(policy);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelPolicy(@PathVariable Long id) {
        policyService.cancelPolicy(id);
        return ResponseEntity.noContent().build();
    }
}


