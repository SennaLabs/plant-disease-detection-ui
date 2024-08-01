import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Home from 'pages/home';
import Login from 'pages/login';

export function App() {
    return (
        <BrowserRouter basename='/plant-disease-detection-ui/'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
