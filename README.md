# Cloudix

## Description

Cloudix is a powerful and user-friendly cloud storage solution designed for seamless file storage and sharing. Built with modern web technologies, Cloudix offers lightweight, decentralized, and subscription-free storage options, enhancing team collaboration and ensuring data privacy.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Convex**: A backend-as-a-service that simplifies building scalable applications.
- **Clerk**: Authentication and user management made easy.
- **Shadcn**: A component library for building consistent and accessible user interfaces.

## Demo

- **Live Demo**: [Cloudix](https://cloudix.vercel.app/)
- **YouTube Demo**: SOON

## Requirements

### Software Requirements

- Node.js (v18.x or higher)
- npm (v7.x or higher) or yarn (v1.x or higher)
- Convex Account: [Convex Quickstart](https://docs.convex.dev/quickstart/nextjs)
- Clerk Account: [Clerk Quickstart](https://clerk.com/docs/quickstarts/nextjs)

### Environment Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Mohammed-Abdelhady/Cloud-Storage-next.js-convex-clerk-shadcn.git
   cd Cloud-Storage-next.js-convex-clerk-shadcn
   ```

2. **Environment Variables**:
   Copy `.env.local.example` to `.env.local` and fill in the required environment variables.

   ```bash
   cp .env.local.example .env.local
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Production Mode

### Requirements

- **Docker**: [Install Docker](https://docs.docker.com/engine/install/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/linux/)

### Steps to Run in Production

1. **Build the Docker Image**:

   ```bash
   docker-compose build
   ```

2. **Start the Containers**:

   ```bash
   docker-compose up -d
   ```

   - The `docker-compose up -d` command runs the containers in detached mode, allowing them to run in the background.

3. **Stopping the Containers**:

   ```bash
   docker-compose down
   ```

   - The `docker-compose down` command stops and removes the containers, networks, and volumes created by `up`.

### Explanation of Commands

- `docker-compose build`: Builds the Docker images defined in the `docker-compose.yml` file.
- `docker-compose up -d`: Starts the services defined in the `docker-compose.yml` file in detached mode.
- `docker-compose down`: Stops and removes the services, networks, and volumes defined in the `docker-compose.yml` file.

## Contributing

We welcome contributions! Please read our Contributing Guide in the repository to learn how you can help.

## License

This project is licensed under the MIT License.
