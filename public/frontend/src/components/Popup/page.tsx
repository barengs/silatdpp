"use state"

export interface PopupProps {
    title: string;
}


const Popup: React.FC<PopupProps> = ({ title }) => {
    return (
        <div className="rounded-md absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
            <h1>{title}</h1>
            <input type="text" />
        </div>
    )
}


export default Popup