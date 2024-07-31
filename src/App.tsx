import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from 'pages/home';
import Login from 'pages/login';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/plant-disease-detection-ui/' element={<Home />} />
                <Route
                    path='/plant-disease-detection-ui/login'
                    element={<Login />}
                />
            </Routes>
        </BrowserRouter>
    );
}
