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

---

## ⚙️ Running the Project

### Prerequisites
- Java 21
- Maven 3.9+
- Docker Desktop
- Node.js 18+

### 1. Clone the repository
```bash
git clone https://github.com/your-org/distributed-banking-platform.git
cd distributed-banking-platform
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your DB credentials and JWT secret
```

### 3. Start everything with Docker Compose
```bash
docker-compose up --build
```

### 4. Run frontend
```bash
cd frontend
npm install
npm start
```

App is available at **http://localhost:3001**
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
├── eureka-server/
├── api-gateway/
├── auth-service/
├── customer-service/
├── account-service/
├── transaction-service/
├── fund-transfer-service/
├── beneficiary-service/
├── statement-service/
├── fd-service/
├── notification-service/
├── frontend/
├── docker-compose.yml
├── .env.example
└── .gitignore
```

---

## 📄 License

This project is built for academic and portfolio purposes.