import './App.css';
import formOptionsData from "../src/state/index.json"
import InputForm from "./components/forms/InputForm";
import TextareaForm from "./components/forms/TextareaForm";
import SelectForm from "./components/forms/SelectForm";
import {useEffect, useState} from "react";
import useValidation from "./hooks/useValidation";

function App() {
    const validationHook = useValidation()
    const [formData, setFormData] = useState({})
    const [showList, setShowList] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        if (formOptionsData.stateData) {
            formOptionsData.stateData.forEach((data) => {
                setFormData((prevState) => ({
                    ...prevState,
                    [data.name]: data.default_value || data.value,
                }));

                setValidationErrors((prevState) => ({
                    ...prevState,
                    [data.name]: validationHook.checkValidation(data, data.default_value || data.value)
                }));
            })
        }
    }, [formOptionsData])

    const formComponent = (data) => {
        switch (data.type) {
            case 'text':
            case 'number':
            case 'email':
                return <InputForm formProps={data} form={formData} validationErrors={validationErrors}
                                  update={updateForm}/>

            case 'longtext':
                return <TextareaForm formProps={data} form={formData} validationErrors={validationErrors}
                                     update={updateForm}/>

            case 'dropdown':
                return <SelectForm formProps={data} form={formData} validationErrors={validationErrors}
                                   update={updateForm}/>
            default:
                return null
        }
    }

    const updateForm = (type, value, error) => {
        setFormData((prevState) => ({
            ...prevState,
            [type]: value
        }));

        setValidationErrors((prevState) => ({
            ...prevState,
            [type]: error
        }));
    }

    const isFormValid = () => {
        const temp = Object.values(validationErrors).filter((item)=>!item)
        return !temp.length
    }

    const save = () => {
        if (!isFormValid()) return alert("Your form not valid")

        setShowList(true)
    }

    return (
        <div className="wrapper">
            <form action="">
                {
                    formOptionsData.stateData
                        ? <>
                            {formOptionsData.stateData.map((data, i) => {
                                return <div key={i}>
                                    {formComponent(data)}
                                </div>
                            })}
                            <button
                                className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                                type="button"
                                onClick={() => save()}>
                                Save
                            </button>
                        </>
                        : null
                }
            </form>

            {
                showList ?
                    <ul className="mt-4">
                        {Object.keys(formData).map((item, index) => {
                            return <li key={index}>
                                <b className="capitalize">{item}: </b>
                                <span>{formData[item]}</span>
                            </li>
                        })}
                    </ul>
                    : null
            }
        </div>
    );
}

export default App;
