import 'bootstrap/dist/css/bootstrap.min.css';
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

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Header />

                <Container className="pt-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/items" element={<ListItemsPage />} />
                        <Route path="/items/:id" element={<ItemPage />} />
                    </Routes>
                </Container>
            </AuthProvider>
        </div>
    );
}

export default App;
