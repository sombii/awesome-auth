import React from "react";
import {Control, Controller, UseFormWatch, } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

interface InputProps<T, T1, T2> {
    name: string,
    type: string,
    label: string,
    control: Control<T, Object>,
    watch?: UseFormWatch<T>,
    watchSibling?: string,
    customRules?: Omit<RegisterOptions<T1, T2>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>

}

export default function FormInput<T, T1, T2>(props: InputProps<T, T1, T2>) {

    let isConfirm: boolean = Boolean(props.watch && props.watchSibling);

    let pwd: string = isConfirm && props.watch!(props.watchSibling);


    let specificRules: {} = props.customRules ?? {};
    if (isConfirm) specificRules = {
        ...specificRules,
        validate: (value: string) => value === pwd || "Passwords do not match"
    }

    return (
        <Controller
            rules={{
                required: {value: true, message: "Field is required",},
                ...specificRules,
            }}
            name={props.name}
            control={props.control}
            render={({field, formState, fieldState: {error}}) => {
                // console.log(error)
                return (
                    <TextField
                        name={props.name}
                        id={props.name}
                        label={props.label}
                        type={props.type}
                        variant="outlined"
                        onChange={field.onChange}
                        value={field.value}
                        error={!!error}
                        helperText={error ? error.message : " "}
                    />
                )

            }}
        />
    );
}