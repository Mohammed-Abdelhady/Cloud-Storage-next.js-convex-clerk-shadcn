# Cloudix

## Description

Discover a state-of-the-art cloud storage solution akin to Google Drive, powered by cutting-edge technologies such as React, Next.js, Shadcn, Convex, and Clerk. This platform empowers users to effortlessly manage and share files with unparalleled performance, robust security features, and intuitive user interfaces.

Embrace the versatility of multi-organization support, where each organization enjoys distinct assets and the capability to invite members seamlessly. Experience the convenience of file management with functionalities including delete and restore options, along with the ability to mark files as favorites for quick access.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Convex**: A backend-as-a-service that simplifies building scalable applications.
- **Clerk**: Authentication and user management made easy.
- **Shadcn**: A component library for building consistent and accessible user interfaces.

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
   Copy `.env.local.example` to `.env.local` and fill in the required environment variables. Ensure to update the following variables specific to Clerk and Convex:

   ```bash
   cp .env.local.example .env.local
   # Update .env.local with the necessary variables, including CLERK_HOSTNAME and CLERK_WEBHOOK_SECRET for Clerk integration.
   ```

3. **Create Webhook from Clerk**:

   - Log in to your Clerk dashboard and create a webhook for integration. Update the `CLERK_WEBHOOK_SECRET` environment variable with the generated webhook secret, and update convex environment from setting and add `CLERK_WEBHOOK_SECRET` `CLERK_HOSTNAME`

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Run the Development Server**:
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
