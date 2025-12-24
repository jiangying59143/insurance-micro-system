package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func NewRouter(service *PaymentService) *mux.Router {
	router := mux.NewRouter()
	router.Use(corsMiddleware)

	// 支付列表及创建（带/不带尾斜杠）
	router.HandleFunc("/api/payments", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			createPaymentHandler(w, r, service)
		case http.MethodGet:
			getAllPaymentsHandler(w, r, service)
		}
	}).Methods("POST", "GET", "OPTIONS")

	router.HandleFunc("/api/payments/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			createPaymentHandler(w, r, service)
		case http.MethodGet:
			getAllPaymentsHandler(w, r, service)
		}
	}).Methods("POST", "GET", "OPTIONS")

	// 单条记录（带/不带尾斜杠）
	router.HandleFunc("/api/payments/{id}", func(w http.ResponseWriter, r *http.Request) {
		getPaymentHandler(w, r, service)
	}).Methods("GET", "OPTIONS")

	router.HandleFunc("/api/payments/{id}/", func(w http.ResponseWriter, r *http.Request) {
		getPaymentHandler(w, r, service)
	}).Methods("GET", "OPTIONS")

	// 按保单查询（带/不带尾斜杠）
	router.HandleFunc("/api/payments/policy/{policyId}", func(w http.ResponseWriter, r *http.Request) {
		getPaymentsByPolicyHandler(w, r, service)
	}).Methods("GET", "OPTIONS")

	router.HandleFunc("/api/payments/policy/{policyId}/", func(w http.ResponseWriter, r *http.Request) {
		getPaymentsByPolicyHandler(w, r, service)
	}).Methods("GET", "OPTIONS")

	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{\"status\":\"ok\"}"))
	}).Methods("GET")

	return router
}

func StartServer(addr string, service *PaymentService) {
	router := NewRouter(service)
	fmt.Printf("支付服务启动在端口 %s\n", addr)
	log.Fatal(http.ListenAndServe(addr, router))
}
