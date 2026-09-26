import "../../styles/ui/spinner.css";

interface SpinnerProps{
    text?:string;
}

export default function Spinner({
    text="Loading..."
}:SpinnerProps){

    return(
        <div className="spinner-container">

            <div className="spinner"/>

            <span className="spinner-text">
                {text}
            </span>

        </div>
    );
}