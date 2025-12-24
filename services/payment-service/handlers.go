package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func createPaymentHandler(w http.ResponseWriter, r *http.Request, service *PaymentService) {
	var req PaymentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.Amount <= 0 {
		http.Error(w, "金额必须大于0", http.StatusBadRequest)
		return
	}

	payment := service.CreatePayment(req)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(payment)
}

func getPaymentHandler(w http.ResponseWriter, r *http.Request, service *PaymentService) {
	vars := mux.Vars(r)
	id := vars["id"]

	payment, exists := service.GetPayment(id)
	if !exists {
		http.Error(w, "支付记录不存在", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

func getAllPaymentsHandler(w http.ResponseWriter, r *http.Request, service *PaymentService) {
	payments := service.GetAllPayments()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payments)
}

func getPaymentsByPolicyHandler(w http.ResponseWriter, r *http.Request, service *PaymentService) {
	vars := mux.Vars(r)
	policyID := vars["policyId"]

	payments := service.GetPaymentsByPolicy(policyID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payments)
}
