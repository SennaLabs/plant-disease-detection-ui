import Inspect from '@components/inspect/inspect';
import TopSection from '@components/top-section/top-section';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            navigate('/login');
        } else {
            setLoading(false);
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <TopSection />
            <Inspect />
        </>
    );
}
