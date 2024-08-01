import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Home from 'pages/home';
import Login from 'pages/login';
import NotFound from '@components/NotFound';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<NotFound />} /> {/* Handle 404 */}
            </Routes>
        </BrowserRouter>
    );
}
