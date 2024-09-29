import { ReactElement, useEffect, useState } from "react";
import './Home.css';

interface Astronaut {
    name: string;
    craft: string;
  }

export const Home = (): ReactElement => {
    const [astronauts, setAstronauts] = useState<Astronaut[]>([]); // State to store the list of astronauts
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState<string | null>(null); // State to handle error

    // Fetch astronauts when the component mounts
    useEffect(() => {
        const fetchAstronauts = async () => {
        try {
            const response = await fetch("http://api.open-notify.org/astros.json");

            if (!response.ok) {
            throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setAstronauts(data.people);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
        };

        fetchAstronauts();
    }, []);

    return (<>
        <div className="home-container">
            <h1>Home</h1>
            <img src="/nasa-Yj1M5riCKk4-unsplash.jpg" alt="astronaut in space" title="astronaut in space"/>
            <h2>Humans Currently in Space</h2>
            <p className="source">data source: <a href="http://api.open-notify.org/astros.json">http://api.open-notify.org/astros.json</a></p>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {astronauts.map((astronaut, index) => (
                <li key={index}>
                    <b>{astronaut.name}</b> (craft: {astronaut.craft})
                </li>
                ))}
            </ul>
        </div>
        
    </>);
}