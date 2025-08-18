# Frontend - Distributed Messaging System

This is the frontend application for a distributed messaging backend system.  
It connects to a Python-based backend which uses a database and RabbitMQ to ensure high availability and real-time communication.

## Features

- 🔐 User authentication and management
- 💬 Sending and receiving messages
- 📂 File uploads
- 📡 Real-time updates (WebSocket)
- 📱 Responsive user interface

## Technologies

- Framework: Angular / React / Vue (← adjust as needed)
- Communication: REST API + WebSocket
- State Management: [e.g. RxJS / Redux]
- Styling: [Bootstrap / Tailwind / custom CSS]

## Project structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Views for each route
├── services/         # API calls and WebSocket logic
├── models/           # TypeScript interfaces
├── assets/           # Static files
└── environments/     # Environment-specific configs
```

## Setup

```bash
npm install
npm run dev
```

## Environment config

Configure the backend API URL and WebSocket endpoint in:

```
src/environments/environment.ts
```

Example:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  wsUrl: 'ws://localhost:8000/ws'
};
```

## Docker 

> Frontend docker: [Frontend chat docker](https://hub.docker.com/repository/docker/agrubio/frontend-chat/general)


## Backend integration

The backend is a Python-based system that stores messages and ensures redundancy via RabbitMQ message queues.  
Make sure the backend is running and accessible from this frontend.

> Backend repo: [github.com/AbelGRubio/frontend-chat](https://github.com/AbelGRubio/backend-chat)
> Backend docker: [Backend chat docker](https://hub.docker.com/repository/docker/agrubio/backend-chat/general)

## License

MIT
