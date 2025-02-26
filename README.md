# Airbnb Clone

A feature-rich Airbnb clone built using modern web technologies including **Next.js**, **Tailwind CSS**, **Prisma**, and **MongoDB**. This project replicates the core functionalities of Airbnb, focusing on performance, scalability, and user experience.

## Application URL

Check out the live demo here: [Airbnb Clone Live](https://your-deployed-app-url.com)

## Features

- **User Authentication:**
  - Secure user login and registration using NextAuth.js for session management.
  
- **Property Listings:**
  - Users can browse and filter property listings by location, availability, and other criteria.
  
- **Property Details:**
  - Detailed view of each listing with images, descriptions, and amenities.
  
- **Booking System:**
  - Users can book properties with real-time availability checks.
  
- **Responsive Design:**
  - Mobile-first design using Tailwind CSS, ensuring a seamless experience across all devices.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) for server-side rendering and dynamic routing.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first responsive design.
- **Backend:** Next.js API routes with [Prisma](https://www.prisma.io/) as the ORM.
- **Database:** [MongoDB](https://www.mongodb.com/) for scalable NoSQL database management.
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) for session-based authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lul-g/next-airbnb.git
   cd airbnb-clone
2. Install dependencies
    ```bash
    npm install
3. Set up environment variables: Create a .env file in the root directory and add the following:
    ```bash
    DATABASE_URL=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_secret
4. Run database migrations:
    ```bash
    npx prisma migrate dev
5. Start the development server:
    ```bash
    npm run dev
6. Open your browser: Navigate to http://localhost:3000 to explore the application.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
