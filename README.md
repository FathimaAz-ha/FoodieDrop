# FoodieDrop 🍕

A modern full-stack food delivery application that allows users to browse fresh produce, add items to cart, and manages their order seamlessly.

## 🌟 Features

- **Product Catalog**: Browse a variety of fresh food items across multiple categories (vegetables, fruits, dairy, beverages)
- **Category Filtering**: Filter products by category for easier shopping
- **Shopping Cart**: Add/remove items from cart with real-time updates
- **Product Details**: View detailed information about products in modal dialogs
- **Responsive Design**: Fully responsive UI that works across all devices
- **Order Management**: Dashboard and checkout pages for order processing
- **User Profile**: Personalized user profile page
- **Notifications**: Real-time notifications for user actions

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.6
- **Language**: Java 21
- **Database**: MongoDB
- **API**: RESTful Web Service
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Routing**: React Router 6.14.1
- **Styling**: CSS3

## 📁 Project Structure

```
FoodieDrop/
├── FoodieDrop/                 # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/vau/ac/lk/FoodieDrop/
│   │   │   │   ├── controller/          # REST API controllers
│   │   │   │   ├── model/               # Data models
│   │   │   │   ├── repository/          # MongoDB repository layer
│   │   │   │   └── service/             # Business logic services
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                        # Unit tests
│   ├── pom.xml                          # Maven configuration
│   └── mvnw/mvnw.cmd                    # Maven wrapper
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/                  # Reusable React components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProductModal.jsx
    │   │   └── Notification.jsx
    │   ├── pages/                       # Page components
    │   │   ├── Home.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Profile.jsx
    │   │   └── AddProduct.jsx
    │   ├── context/
    │   │   └── CartContext.jsx          # Global state management
    │   ├── data/
    │   │   └── products.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## 🚀 Getting Started

### Prerequisites
- **Java 21** or higher
- **Node.js 16+** and npm
- **MongoDB** (local or Atlas)

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd FoodieDrop
   ```

2. Configure MongoDB connection in `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/foodiedrop
   ```

3. Build the project:
   ```bash
   ./mvnw clean build
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Start Backend Server

```bash
cd FoodieDrop
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in your terminal)

## 📦 Building for Production

### Backend
```bash
cd FoodieDrop
./mvnw clean package
```

### Frontend
```bash
cd frontend
npm run build
```

The built frontend files will be in the `dist` directory.

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## 📋 Available Frontend Routes

- `/` - Home page with product catalog
- `/dashboard` - Admin dashboard
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/profile` - User profile
- `/add-product` - Add new product

## 📝 Project Categories

The application supports the following product categories:
- Vegetables
- Fruits
- Dairy
- Beverages

## 🧪 Testing

### Backend Tests
```bash
cd FoodieDrop
./mvnw test
```

### Frontend Tests (if configured)
```bash
cd frontend
npm test
```

## 🛑 Global Exception Handling

The backend includes a `GlobalExceptionHandler` for consistent error responses across all API endpoints.

## 📱 Frontend Components

- **Navbar**: Navigation menu with links to main pages
- **Footer**: Footer section with company information
- **ProductCard**: Displays individual product information
- **ProductModal**: Detailed product view in modal dialog
- **Notification**: User feedback system for actions
- **CartContext**: Global state management for shopping cart

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue on the repository or contact the development team.

---

**Happy Coding! 🚀**
