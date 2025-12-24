package main

import "time"

type Payment struct {
	ID            string    `json:"id"`
	PolicyID      string    `json:"policyId"`
	Amount        float64   `json:"amount"`
	Status        string    `json:"status"`
	PaymentMethod string    `json:"paymentMethod"`
	CreatedAt     time.Time `json:"createdAt"`
	ProcessedAt   time.Time `json:"processedAt,omitempty"`
}

type PaymentRequest struct {
	PolicyID      string  `json:"policyId"`
	Amount        float64 `json:"amount"`
	PaymentMethod string  `json:"paymentMethod"`
}
