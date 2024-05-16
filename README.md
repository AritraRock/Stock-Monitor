
# Stock Monitoring Platform

This stock monitoring platform allows users to create and manage watchlists of stock symbols and displays the latest stock values on the dashboard. The platform is built using React for the frontend and Django for the backend.


## Features

- User authentication: Secure and simple authentication mechanism for users.
- Watchlist management: Users can create and manage their own watchlists of stock symbols.
- Dashboard: Displays the latest stock values of symbols on the user's watchlist.
- Multi-user support: Handles multiple users concurrently, each having different watchlists.
- External API integration: Utilizes the Alpha Vantage API to pull stock information.


## Tech Stack

**Frontend:** React, TypeScript, Material-UI

**Backend:** Django, Django REST Framework


## Installation
Clone the repository:

```bash
  git clone https://github.com/AritraRock/Stock-Monitor.git
  cd Stock-Monitor
```
### Backend

Navigate to the backend directory:

```bash
  cd backend_api
```

Install dependencies:

```bash
  pip install -r requirements.txt
```

Apply migrations:

```bash
  python manage.py migrate
```

Start the Django development server:

```bash
  python manage.py runserver
```
### Frontend

Navigate to the frontend directory:

```bash
  cd frontend
```

Install dependencies:

```bash
  npm install
```

Start the development server:

```bash
  npm start
```
Access the frontend application at http://localhost:3000 in your browser. (without starting backend you won't be able to register or login)

## Usage

- You can search your desired stocks in the http://localhost:3000/dashboard and add to your watchlist

- You can also check and manage your favorite stocks in the http://localhost:3000/watchlist and add to your watchlist
