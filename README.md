# **MovNow** 🌟  
A cutting-edge platform for discovering and managing movies, built with modern web technologies. MovNow allows users to explore movies, leave reviews, and sign in seamlessly using Google OAuth integration.  

---

## **Features** 🚀  
- 🎥 **Movie Database**: Explore a wide variety of movies with detailed information.  
- ⭐ **User Reviews**: Leave and manage reviews for your favorite films.  
- 🔒 **Google OAuth Integration**: Secure and easy login using Google accounts.  
- 📊 **Admin Panel**: Manage movies, users, and reviews efficiently.   

---

## **Tech Stack** 🛠️  
- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)  , [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- **Backend**: [Node.js](https://nodejs.org/), [Prisma ORM](https://www.prisma.io/)  
- **Database**: [PostgreSQL](https://www.postgresql.org/)  
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google OAuth 2.0  
- **Containerization**: [Docker](https://www.docker.com/)  

---

## **Getting Started** 🏁

### **Prerequisites**  
1. [Node.js](https://nodejs.org/) (v18 or above)  
2. [Docker](https://www.docker.com/get-started)  

---

### **Setup Instructions (Docker)**  

1. **Clone the Repository**  
   ```bash
   git clone -b Deployment --single-branch https://github.com/frzxyz/WebDev
   cd WebDev

2. **Create .env.local file in root project**  
   ```bash
    GOOGLE_CLIENT_ID= YOUR_CLIENT_ID
    GOOGLE_CLIENT_SECRET= YOUR_CLIENT_SECRET
    NEXTAUTH_SECRET=your-random-secret-key
    NEXTAUTH_URL=http://localhost  

3. **Build and Start with Docker**  
   ```bash
    docker-compose up --build

4. **Access the Application**  
   ```bash
    http://localhost


## **Changing Port**
The app is running on port 80, if you want to change the port, go to DockerFile and change to expose port you want. Don't Forget to change the port on docker-compose.yml file too.