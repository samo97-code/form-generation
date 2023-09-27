import React from 'react';

const useValidation = () => {
    const checkValidation = (formProps, value) => {
        let valid = true

        if (formProps.min_value || formProps.max_value) {
            valid = value >= formProps.min_value && value <= formProps.max_value
        }else if (formProps.validation) {
            const regEx = new RegExp(formProps.validation)
            valid = regEx.test(value)
        }

        return valid
    }

    return { checkValidation}
};

export default useValidation;