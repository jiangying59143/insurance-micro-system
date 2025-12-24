package main

func main() {
	service := NewPaymentService()
	// Start server on :8081
	StartServer(":8081", service)
}
