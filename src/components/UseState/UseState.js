import React from "react";

function UseState({name}){
    // crear un estado en componentes tipos funcion
    // const [state, setState] = React.useState(initialState);

    const [error, setError] = React.useState(true);

    return (
        <div>
            <h2>Delete {name}</h2>
            <p>Please write the security code to delete UseState</p>

            {error && (<p>ERROR: The security code is incorrect</p>)}

            <input placeholder="Security code..." />
            <button
                onClick={()=>{setError(prevState => !prevState)}}
            >Comprobar</button>
        </div>
    );
};

export {UseState};