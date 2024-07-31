import Inspect from '@components/inspect/inspect';
import TopSection from '@components/top-section/top-section';

export default function Home() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '/login';
    }
    return (
        <>
            <TopSection />
            <Inspect />
        </>
    );
}
