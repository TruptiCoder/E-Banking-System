# 🏦 Distributed Digital Banking Platform

A production-style **microservices-based digital banking system** built with Spring Boot, Apache Kafka, React.js, and PostgreSQL.

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Trupti Balbudhe** | Backend — Microservices Development |
| **Unnati Wagh** | Backend — Microservices Development |
| **Jay Deshmukh** | Backend — Microservices Development |
| **Gauri Gadgil** | Frontend — React.js Development |

---

## 🧩 Tech Stack

**Backend:** Java 21, Spring Boot 3.2, Spring Cloud Gateway, Netflix Eureka, Apache Kafka, Resilience4j, JWT + Spring Security, PostgreSQL

**Frontend:** React.js

**Infrastructure:** Docker, Docker Compose

---

## 🗂️ Microservices

| Service | Port | Description |
|---------|------|-------------|
| Eureka Server | 8761 | Service discovery |
| API Gateway | 8080 | Single entry point, JWT validation |
| Auth Service | 8081 | Login, register, JWT, passwords |
| Customer Service | 8082 | Customer profiles |
| Account Service | 8083 | Account management, balances |
| Transaction Service | 8084 | Transaction ledger |
| Fund Transfer Service | 8085 | Fund transfers |
| Beneficiary Service | 8086 | Payee management |
| Statement Service | 8087 | Account statements |
| Fixed Deposit Service | 8088 | FD lifecycle |
| Notification Service | 8089 | SMS & Email alerts |
| Admin Service | 8090 | Customer and account creation |

---

## ⚙️ Running the Project

### Prerequisites
- Java 21
- Maven 3.9+
- Docker Desktop
- Node.js 18+

### 1. Clone the repository
```bash
git clone https://github.com/TruptiCoder/E-Banking-System.git
cd E-Banking-System
```

### 2. Run frontend
```bash
cd ebs-frontend
npm install
npm start
```

App is available at **http://localhost:5173**
API Gateway at **http://localhost:8080**
Eureka Dashboard at **http://localhost:8761**

---

## 🔑 Key Features

- JWT-based authentication with transaction PIN security
- Real-time fund transfers with beneficiary validation
- Event-driven notifications via Apache Kafka
- Fixed deposit management
- Virtual ATM simulation
- Account statements with date-range filtering
- Circuit breaker & retry with Resilience4j
- Centralized monitoring with Prometheus + Grafana

---

## 📁 Project Structure

```
distributed-banking-platform/
├── EBS-Discovery-Server/
├── EBS-ApiGateway/
├── ebs-auth/
├── ebs-customer/
├── EBS-Account/
├── EBS-TransactionService2/
├── EBS-FundTransfer/
├── EBS-BeneficiaryService/
├── EBS-Statement/
├── EBS-FundTransfer/
├── EBS-NOTIFICATION/
├── EBS-frontend/
├── ebs-admin/
└── .gitignore
```

---
