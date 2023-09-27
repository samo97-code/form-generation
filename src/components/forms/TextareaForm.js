import React from 'react';
import useValidation from "../../hooks/useValidation";

const TextareaForm = ({formProps, form, validationErrors, update}) => {
    const validationHook = useValidation()

    const updateForm = (e) => {
        const error = validationHook.checkValidation(formProps, e.target.value)
        update(e.target.name, e.target.value,error)
    }

    return (
        <div className="form-group mb-4">
            <label htmlFor={`${formProps.name}-id`}
                   className="block w-full pb-1 text-sm font-mcedium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 capitalize">{formProps.name}</label>
            <textarea
                className="peer w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                name={formProps.name}
                id={`${formProps.name}-id`}
                cols="30"
                rows="10"
                onInput={(e) => {
                    updateForm(e)
                }}>
                {form[formProps.name]}
            </textarea>

            {
                !validationErrors[formProps.name] ?
                    <p className="mt-2 text-xs text-[#dc3545]">{formProps.name} field not valid</p> : ''
            }
        </div>
    );
};

export default TextareaForm;