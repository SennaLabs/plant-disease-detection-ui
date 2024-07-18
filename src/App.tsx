import './App.css';
import Navbar from './components/nav/nav';
import TopSection from 'components/top-section/top-section';
import Inspect from 'components/inspect/inspect';

export function App() {
    return (
        <>
            <Navbar />
            <TopSection />
            <Inspect />
        </>
    );
}
