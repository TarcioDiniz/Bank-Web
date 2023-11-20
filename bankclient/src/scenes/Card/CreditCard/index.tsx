import React, {useState} from "react";
import Cards from "react-credit-cards-2";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = () => {
    const [state] = useState({
        number: "5594 0980 4009 4562",
        expiry: "06/2024",
        cvc: "417",
        name: "Tarcio Diniz",
        focus: "",
    });

    return (
        <>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
            />
        </>
    );
};

export default PaymentForm;
