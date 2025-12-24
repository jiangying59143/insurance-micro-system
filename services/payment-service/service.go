package main

import (
	"sync"
	"time"

	"github.com/google/uuid"
)

type PaymentService struct {
	payments map[string]*Payment
	mu       sync.RWMutex
}

func NewPaymentService() *PaymentService {
	return &PaymentService{
		payments: make(map[string]*Payment),
	}
}

func (ps *PaymentService) CreatePayment(req PaymentRequest) *Payment {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	payment := &Payment{
		ID:            uuid.New().String(),
		PolicyID:      req.PolicyID,
		Amount:        req.Amount,
		Status:        "PENDING",
		PaymentMethod: req.PaymentMethod,
		CreatedAt:     time.Now(),
	}

	ps.payments[payment.ID] = payment

	go ps.processPayment(payment.ID)

	return payment
}

func (ps *PaymentService) processPayment(paymentID string) {
	time.Sleep(500 * time.Millisecond)

	ps.mu.Lock()
	defer ps.mu.Unlock()

	if payment, exists := ps.payments[paymentID]; exists {
		payment.Status = "COMPLETED"
		payment.ProcessedAt = time.Now()
	}
}

func (ps *PaymentService) GetPayment(id string) (*Payment, bool) {
	ps.mu.RLock()
	defer ps.mu.RUnlock()

	payment, exists := ps.payments[id]
	return payment, exists
}

func (ps *PaymentService) GetAllPayments() []*Payment {
	ps.mu.RLock()
	defer ps.mu.RUnlock()

	payments := make([]*Payment, 0, len(ps.payments))
	for _, p := range ps.payments {
		payments = append(payments, p)
	}
	return payments
}

func (ps *PaymentService) GetPaymentsByPolicy(policyID string) []*Payment {
	ps.mu.RLock()
	defer ps.mu.RUnlock()

	var payments []*Payment
	for _, p := range ps.payments {
		if p.PolicyID == policyID {
			payments = append(payments, p)
		}
	}
	return payments
}
