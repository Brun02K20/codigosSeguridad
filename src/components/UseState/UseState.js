import React from "react";

function UseState({name}){
    // crear un estado en componentes tipos funcion
    // const [state, setState] = React.useState(initialState);

    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        if(!!loading){
            setTimeout(() => {
                console.log("Inicio");
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

            <input placeholder="Security code..." />
            <button
                onClick={()=>{setLoading(true)}}
            >Comprobar</button>
        </div>
    );
};

export {UseState};