# Django Chat App

A real-time chat application built with a **Django** backend and a **React** frontend.

## Overview

This project is a modern chat application that leverages Django for the backend and React for the frontend. The backend uses **WebSockets** to provide live, real-time communication, while the frontend utilizes **socket.io** to interact with the WebSocket server seamlessly.

---

## Features

- **Real-time Messaging:** Instant messaging using WebSockets and socket.io.
- **User Authentication:** Secure registration and login system.
- **Chat Rooms:** Multiple chat rooms or private messaging (extendable).
- **Modern UI:** Built with React for a fast, responsive user experience.
- **Scalable:** Django Channels enables scalable WebSocket handling.

---

## Tech Stack

- **Backend:** Django, Django Channels, WebSockets
- **Frontend:** React, socket.io-client
- **Database:** (Your choice, e.g., PostgreSQL, SQLite)
- **Other:** Django REST framework (optional for REST APIs)

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- (Optional) Docker

### Backend Setup (Django)

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd <repo-folder>/backend
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Run migrations:
    ```bash
    python manage.py migrate
    ```

4. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

5. Start the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

---

## How it Works

- **Backend:** Uses Django Channels to establish WebSocket connections for real-time messaging.
- **Frontend:** Connects to the WebSocket endpoint using socket.io-client, enabling instant message updates and live chat features.

---

## Folder Structure

```
/backend     # Django project (API, Channels, WebSocket consumers)
/frontend    # React application (UI, socket.io-client)
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgments

- [Django Channels Documentation](https://channels.readthedocs.io/en/stable/)
- [React](https://react.dev/)
- [Socket.io](https://socket.io/)
