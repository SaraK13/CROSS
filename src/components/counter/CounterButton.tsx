import { ReactElement } from "react";
import './CounterButton.css';

export const CounterButton = (props: CounterButtonProps): ReactElement => {
    const { caption, onClick } = props;

    return (<button className="counter-button" onClick={onClick}>{caption}</button>);
    }

interface CounterButtonProps {
    // caption and onClick is mandatory
    caption: string;
    onClick: () => void;
};