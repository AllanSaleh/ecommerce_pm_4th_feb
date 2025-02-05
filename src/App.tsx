import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ProductProvider } from './context/ProductContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import Cart from './pages/Cart';
import Navbar from './components/Navbar/Navbar';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<Profile />} path='/profile' />
                <Route element={<Cart />} path='/cart' />
                <Route element={<Login />} path='/login' />
                <Route element={<Logout />} path='/logout' />
                <Route element={<Register />} path='/register' />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
