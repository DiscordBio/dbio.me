import { useContext, createContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children, value }) => {

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
};

export default FormProvider;