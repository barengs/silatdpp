import Alert from "../Alert";

const AlertContainer: React.FC = () => {

    const alerts = [
        {type: "success", messege: "Data Berhasil Ditambahkan!"},
        {type: "error", messege: "Data Gagal Ditambahkan!"},
    ]

    return (
        <div className="absolute right-4 top-4 z-99 flex flex-col min-h-screen gap-y-4">
            {alerts.map((item, key) => <Alert key={key} />)}
        </div>
    )
}


export default AlertContainer;