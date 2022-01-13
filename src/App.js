import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider';
import HomePage from './pages/HomePage';
import ListItemsPage from './pages/ListItemsPage';
import ItemPage from './pages/ItemPage';

import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import AddItem from './components/AddItem';

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <AuthProvider>
                <Header />

                <Container className="py-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/items" element={<ListItemsPage />} />
                            <Route path="/items/create" element={<AddItem />} />
                            <Route path="/items/:id" element={<ItemPage />} />
                        </Route>
                        <Route path="*" element={<h1>Page not found 404</h1>} />
                    </Routes>
                </Container>
            </AuthProvider>
        </div>
    );
}

export default App;
