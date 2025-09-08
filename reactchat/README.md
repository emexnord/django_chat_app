# React Chat Application

This project is a real-time chat application built with React, TypeScript, and Vite. It provides a modern, responsive interface for users to send and receive messages instantly.

## Features

- Real-time messaging
- User authentication
- Responsive UI
- Message history
- Emoji support

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Django (with Django Channels for WebSocket support)
- **Styling:** CSS Modules / Tailwind CSS (customize as needed)
- **State Management:** React Context / Redux (customize as needed)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Backend Setup

Make sure the Django backend is running and configured to accept WebSocket connections.

## Project Structure

```
reactchat/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── tsconfig.json
```

## Customization

- Update styles and components in the `src/components` directory.
- Configure API endpoints in environment variables or a config file.

## License

This project is licensed under the MIT License.
