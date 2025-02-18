import { FormEvent, PropsWithChildren } from "react";

export default interface FormPropsType extends PropsWithChildren {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}