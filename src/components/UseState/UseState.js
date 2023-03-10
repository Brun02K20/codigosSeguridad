import React from "react";

// al ser todo mayuscula indicamos que nunca el valor almacenado cambiara, es una convencion nada mas
const SECURITY_CODE = "paradigma";

// el componente UseState
function UseState({name}){
    // crear un estado en componentes tipos funcion
    // const [state, setState] = React.useState(initialState);

    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    // // creando un estado dinamico que dependa de lo que escriban los usuarios en un input
    // const [value, setValue] = React.useState('');
    
    // creando estado compuesto mediante hooks
    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        deleted: false, // cambios de pantalla
        confirmation: false,
    });

    // debuggueando el estado
    // console.log(state);

    // aca crearemos la funcion que especificara el paso a paso de actualizaciones de estado, haciendo el codigo un poco mas declarativo

    // estos son los diferentes posibles estados compuestos

    // estado de confirmacion
    const onConfirm = () => {
        setState({...state, error: false, loading: false, confirmation: true});
    };

    // estado de error
    const onError = () => {
        setState({...state, error: true, loading: false});
    };

    // estado dinamico del valor del input
    const onWrite = (newValue) => {
        setState({...state, value: newValue});
    };

    // estado de comprobacion de que el codigo ingresado por el usuairo es correcto o no
    const onCheck = () => {
        setState({...state, loading: true});
    };

    // estado de borrado
    const onDelete = () => {
        setState({...state, deleted: true});
    };

    // estado de reseteo/recuperacion
    const onReset = () => {
        setState({
            ...state, 
            deleted:false, 
            confirmation: false, 
            value: "",
        });
    };


    // aca estamos simulando el llamado a una API
    React.useEffect(()=>{
        if(!!state.loading){
            setState({...state, error: false}) //setError(false);
            setTimeout(() => {
                console.log("Inicio");

                // validando si la palabra ingresada por el usuario es correcta
                // este ...state lo que hace es replicar todas las propiedades del objeto state en este nuevo objeto resultante del setState
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else { onError();
                    // setError(true);
                    // setLoading(false);
                };

                // tuve un problema al aplicar esto del estado compuesto y fue que me daba que error siempre era false, la solucion fue eliminar esta linea de codigo:
                // setState({value: state.value, error: state.error, loading: false}) //setLoading(false);
                console.log("Fin");
            }, 2000);
        }
    }, [state.loading]);

    // renderizacion mediante opciones
    if (!state.deleted && !state.confirmation) {
        return (
            <div>
                <h2>Delete {name}</h2>
                <p>Please write the security code to delete UseState</p>
    
                {(!state.loading && state.error) && (<p>ERROR: The security code is incorrect</p>)}
    
                {state.loading && (<p>LOADING...</p>)}
    
                {/* nota: el evento que se recibe de parametro es lo que escriba el usuario */}
                <input 
                    placeholder="Security code..." 
                    value={state.value} 
                    onChange={(evento) => {onWrite(evento.target.value)}}
                />
                
                <button
                    onClick={()=>{onCheck();}}
                >
                    Check
                </button>
            </div>
        );
    } else if (!!state.confirmation && !state.deleted) {
        return (
            <React.Fragment>
                <p>Are you sure you want to delete: {name}?</p>
                <button
                    onClick={() => {onDelete();}}
                >
                    Yes, I'm sure
                </button>

                <button 
                    onClick={() => {onReset();}}
                >
                    No, I want to return
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <h2>{name} was successfully removed</h2>
                <button
                    onClick={() => {onReset();}}
                >
                    Recover {name}
                </button>
            </React.Fragment>
        );
    };
};

export {UseState};