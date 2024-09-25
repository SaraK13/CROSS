import { ReactElement } from "react";
import './LogButton.css';

export const LogButton = (props: LogButtonProps): ReactElement => {
    const { caption, onClick } = props;

    return (<button className="log-button" onClick={onClick}>{caption}</button>);
}

interface LogButtonProps {
    caption: string;
    onClick: () => void;
};