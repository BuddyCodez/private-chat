# Private Chat 🔒

> **Secure, Ephemeral, Real-time Messaging for the Modern Web.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

---

## 🎥 Demo

Check out the application in action:

https://github.com/user-attachments/assets/placeholder-guid-for-video

<!--
  NOTE: To display the video directly on GitHub, you typically need to upload it to the repository's assets or use a relative path if the file is small.
  Since the user specified 'resource/vid.mp4', you can link to it relative to the repo:
-->

<video src="resource/vid.mp4" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

_If the video above doesn't play, you can [download it here](resource/vid.mp4)._

---

## 📖 About The Project

**Private Chat** is a privacy-first messaging application designed for fleeting conversations. In an era of persistent data, Private Chat offers a sanctuary where your words are yours alone—and only for as long as you need them to be.

Built with performance and security in mind, this application ensures that once a room is destroyed, it is gone forever. No logs, no history, no traces.

### Key Features

- **👻 Ephemeral by Design:** Rooms and messages self-destruct.
- **⚡ Real-time Sync:** Powered by WebSockets for instant communication.
- **🔒 Privacy First:** No persistent database storage for chat history after room destruction.
- **🎨 Modern UI:** Sleek, dark-mode aesthetic built with Tailwind CSS v4.
- **🚀 High Performance:** Leveraging the speed of Bun and Next.js.

---

## 🛠️ Tech Stack

This project is built using a cutting-edge stack focused on speed, developer experience, and scalability.

### Core

- **[Next.js 16](https://nextjs.org/)** - The React Framework for the Web.
- **[React 19](https://react.dev/)** - The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at Any Scale.
- **[Bun](https://bun.sh/)** - A fast all-in-one JavaScript runtime.

### Styling

- **[Tailwind CSS v4](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons.

### Backend & Data

- **[ElysiaJS](https://elysiajs.com/)** - Ergonomic Framework for Humans (via Eden).
- **[Upstash Redis](https://upstash.com/redis)** - Serverless Redis for state management.
- **[Upstash Realtime](https://upstash.com/realtime)** - Serverless WebSocket/Realtime messaging.
- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful asynchronous state management.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have **[Bun](https://bun.sh/)** installed on your machine.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/private-chat.git
    cd private-chat
    ```

2.  **Install dependencies**

    ```bash
    bun install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your Upstash credentials:

    ```env
    UPSTASH_REDIS_REST_URL=your_url_here
    UPSTASH_REDIS_REST_TOKEN=your_token_here
    # Add other necessary env vars
    ```

4.  **Run the development server**

    ```bash
    bun dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app running.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by Udit</p>
</div>
