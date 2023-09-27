import React from 'react';
import useValidation from "../../hooks/useValidation";

const InputForm = ({formProps, form, validationErrors, update}) => {
    const validationHook = useValidation()

    const updateForm = (e) => {
        const typedValue = formProps.type === 'number' ? +e.target.value : e.target.value

        const error = validationHook.checkValidation(formProps, typedValue)
        update(e.target.name, typedValue,error)
    }

    return (
        <div className="form-group mb-4">
            <label htmlFor={`${formProps.name}-id`}
                   className="block w-full pb-1 text-sm font-mcedium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 capitalize">{formProps.name}</label>
            <input
                className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                id={`${formProps.name}-id`}
                type={formProps.type}
                value={form[formProps.name]}
                name={formProps.name}
                min={formProps.min_value}
                max={formProps.max_value}
                onInput={(e) => {
                    updateForm(e)
                }}
            />

            {
                !validationErrors[formProps.name] ?
                    <p className="mt-2 text-xs text-[#dc3545]">{formProps.name} field not valid</p> : ''
            }
        </div>
    );
};

export default InputForm;