import Inspect from '@components/inspect/inspect';
import TopSection from '@components/top-section/top-section';
import { useEffect, useState } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = '/plant-disease-detection-ui/login';
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
