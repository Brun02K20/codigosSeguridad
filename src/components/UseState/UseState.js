import React from "react";

// al ser todo mayuscula indicamos que nunca el valor almacenado cambiara, es una convencion nada mas
const SECURITY_CODE = "paradigma";

function UseState({name}){
    // crear un estado en componentes tipos funcion
    // const [state, setState] = React.useState(initialState);

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // creando un estado dinamico que dependa de lo que escriban los usuarios en un input
    const [value, setValue] = React.useState('');

    // debuggueando el estado de value
    console.log(value);


    React.useEffect(()=>{
        if(!!loading){
            setError(false);
            setTimeout(() => {
                console.log("Inicio");

                // validando si la palabra ingresada por el usuario es correcta
                if (value === SECURITY_CODE) {
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                };

                setLoading(false);
                console.log("Fin");
            }, 2000);
        }
    }, [loading]);

    return (
        <div>
            <h2>Delete {name}</h2>
            <p>Please write the security code to delete UseState</p>

            {error && (<p>ERROR: The security code is incorrect</p>)}

            {loading && (<p>LOADING...</p>)}

            {/* nota: el evento que se recibe de parametro es lo que escriba el usuario */}
            <input 
                placeholder="Security code..." 
                value={value} 
                onChange={(evento) => {setValue(evento.target.value)}}
            />
            
            <button
                onClick={()=>{setLoading(true)}}
            >
                Comprobar
            </button>
        </div>
    );
};

export {UseState};