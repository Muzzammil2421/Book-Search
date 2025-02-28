# BookSearch

BookSearch is a full-stack application that allows users to search for books, manage their favorite books, and authenticate securely. The project consists of two parts:
- **book-search-frontend**: Built with Angular 19 (module-based, not standalone) and Bootstrap for UI.
- **book-search-backend**: Developed using Strapi 5, running on Node.js 22 with authentication via JWT.

The database is managed using MySQL, and users must create a schema and import the dataset.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Development](#development)
- [Configuration](#configuration)
- [Usage](#usage)
- [References](#references)
- [Additional Resources](#additional-resources)

---

## Installation and Setup

### Database Setup
1. Ensure MySQL is installed and running.
2. Create a new schema named `book-search` in MySQL.
3. Import the provided SQL file (`book-search.sql`) into the database:
   ```bash
   mysql -u root -p book-search < book-search.sql
   ```
   Enter your MySQL password when prompted.

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd book-search-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   If the installation fails, try:
   ```bash
   npm install --force
   ```
3. Start the backend server (make sure you have checked the #configuration section):
   ```bash
   npm run develop
   ```

By default, the backend will run on `http://localhost:1337`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd book-search-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   If necessary, use:
   ```bash
   npm install --force
   ```
3. Start the frontend server:
   ```bash
   ng serve -o
   ```
   This will automatically open the application in your default browser at `http://localhost:4200/`.

## Configuration

### Environment Variables
Create a `.env` file in `book-search-backend` with the following structure:

```
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=your-app-key1,your-app-key2,your-app-key3,your-app-key4
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=book-search
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
DATABASE_FILENAME=
JWT_SECRET=your-jwt-secret

# Email Configuration (Gmail API)
EMAIL_OAUTH2_USERID=your-email@gmail.com
EMAIL_OAUTH2_CLIENTID=your-client-id
EMAIL_OAUTH2_CLIENTSECRET=your-client-secret
EMAIL_OAUTH2_REFRESHTOKEN=your-refresh-token
EMAIL_FROM=default-from-book-search@book-search.com
EMAIL_REPLYTO=default-reply-to-book-search@book-search.com
EMAIL_TEST_ADDRESS=test@book-search.com
```
> **Note:** Replace `your-...` values with your actual credentials. The Gmail API is used for email services such as confirmation emails on sign-up.
Follow the setup instructions from [@bztes/strapi-provider-email-gmail-api](https://www.npmjs.com/package/@bztes/strapi-provider-email-gmail-api) to configure mailing services.

## Usage

1. Open `http://localhost:4200/`.
2. Use the search bar to find books.
3. To save favorite books, sign up first.
4. After signing up, check your email for a confirmation link.
5. Log in after confirming your email.
6. Enjoy searching and managing your favorite books!

## References
- **Dataset Used:** [Kaggle Books Dataset](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset?resource=download)
- **Angular CLI Documentation:** [Angular CLI Overview](https://angular.dev/tools/cli)
- **Strapi Documentation:** [Strapi Docs](https://docs.strapi.io/)
- **Gmail API Provider for Strapi:** [@bztes/strapi-provider-email-gmail-api](https://www.npmjs.com/package/@bztes/strapi-provider-email-gmail-api)


This project provides a comprehensive book search experience with authentication, favorites management, and email confirmations. Follow the setup instructions carefully to get started!

