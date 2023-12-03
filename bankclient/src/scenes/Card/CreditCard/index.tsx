import React, {useState} from "react";
import Cards from "react-credit-cards-2";
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {getAuthenticatedAccount} from "../../../data/globals";

const PaymentForm = () => {
    const [state] = useState({
        number: "",
        expiry: "/",
        cvc: 123,
        focus: "",
    });

    return (
        <>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={String(getAuthenticatedAccount()?.fullName)}
            />
        </>
    );
};

export default PaymentForm;
