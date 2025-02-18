import FormPropsType from "@/types/components/Forms";

const Form: React.FC<FormPropsType> = ({ onSubmit, children}) => {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            {children}
        </form>
    )
}



export default Form;