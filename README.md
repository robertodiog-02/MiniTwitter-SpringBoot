# 🐦 MiniTwitter - A Simple Twitter-Style Social App

MiniTwitter is a lightweight social media web application inspired by Twitter.  
It allows users to register, log in, post short messages, and interact through comments.

---

## 🚀 Tech Stack

- **Java 17**
- **Spring Boot**
- **Spring Security**
- **Thymeleaf**
- **MySQL** (local)
- **Maven**
- **HTML/CSS/JS**

---

## ✨ Features

- 🔐 User registration and login
- 📝 Create and publish posts
- 💬 Comment on posts
- 👥 Basic user roles & access control (Spring Security)
- 📄 Responsive UI using Thymeleaf templates

---

## ⚙️ Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/robertodiog-02/MiniTwitter-SpringBoot.git
cd MiniTwitter-SpringBoot
```
### 2. Import the MySQL database

Make sure MySQL is installed and running. Then create a database and import the dump:
```bash
mysql -u your_mysql_user -p minitwitter < dump/dioguardi_dump.sql
```
Replace your_mysql_user with your MySQL username and enter your password when prompted.

### 3. Configure the database connection
Edit the file:
```bash
src/main/resources/application.properties
```
Update the credentials and database name if needed:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/minitwitter
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
```
### 4. Run the application