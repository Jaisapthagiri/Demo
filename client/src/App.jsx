// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import AdminView from './components/AdminView';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Registration />} />
          <Route path="admin" element={<Admin />} />
          <Route
            path="admin-view"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminView />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
