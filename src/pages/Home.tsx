// import { useState } from 'react'
import { ReactElement } from "react";
// import { CounterButton } from '../components/counter/CounterButton';
// import { multiply } from '../utils/calculationUtils';


export const Home = (): ReactElement => {
    // const [count, setCount] = useState(2);
    /* const appTitle = "this is a title";
    const incrementCount = (): void => {
        const newValue = multiply(count, count);
        //setCount(count + 1);
        //setCount((count) => count + 1);
        setCount(newValue);
    }
    const decrementCount = (): void => {
        setCount((count) => count - 1);
    } */
    return (<>
        <h1>Home</h1>

        {/* <div className="card" title={ appTitle }>
            <CounterButton caption="Increment by 1" onClick={incrementCount}/>
            <CounterButton caption="Decrement by 1" onClick={decrementCount}/>
            <button onClick={incrementCount}>
            Increment by 1
            </button>
            <button onClick={decrementCount}>
            Decrementss by 1
            </button>
            <div>Count is {count}</div>
        </div> */}
    </>);
}