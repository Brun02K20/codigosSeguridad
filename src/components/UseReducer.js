import React from "react";

// al ser todo mayuscula indicamos que nunca el valor almacenado cambiara, es una convencion nada mas
const SECURITY_CODE = "paradigma";

// el componente UseState
function UseReducer({name}){
    // React.useReducer(); funcion que recibe 2 parametros: el primero es el reducer, y el segundo es el estado compuesto inicial (recordemos que este es un objeto). Ahora por mera convencion el actualizador del estado se llamara dispatch
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // debuggueando el estado
    console.log(state);

    // estos son los action creators
    // estado de confirmacion
    const onConfirm = () => {
        dispatch({type: actionTypes.confirm});
    };

    // estado de error
    const onError = () => {
        dispatch({type: actionTypes.error});
    };

    // estado dinamico del valor del input
    const onWrite = (newValue) => {
        dispatch({type: actionTypes.write, payload: newValue});
    };

    // otra forma de hacer el onwrite (ver lineas 78 a 85):
    // const onWrite = (evento) => {dispatch({type: actionTypes.write, payload: evento.target.value});}

    // estado de comprobacion de que el codigo ingresado por el usuairo es correcto o no
    const onCheck = () => {
        dispatch({type: actionTypes.check});
    };

    // estado de borrado
    const onDelete = () => {
        dispatch({type: actionTypes.delete});
    };

    // estado de reseteo/recuperacion
    const onReset = () => {
        dispatch({type: actionTypes.reset});
    };

    // aca estamos simulando el llamado a una API
    React.useEffect(()=>{
        if(!!state.loading){
            // setState({...state, error: false}) //setError(false);
            setTimeout(() => {
                console.log("Inicio");
                // validando si la palabra ingresada por el usuario es correcta
                // este ...state lo que hace es replicar todas las propiedades del objeto state en este nuevo objeto resultante del setState
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else { onError();};

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
                {/* Otra forma de hacer el onChange era: onChange={onWrite}, funcaba igual */}
                <input 
                    placeholder="Security code..." 
                    value={state.value} 
                    onChange={(evento) => {
                        onWrite(evento.target.value);
                    }}
                />
                
                <button
                    onClick={onCheck}
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
                    onClick={onDelete}
                >
                    Yes, I'm sure
                </button>

                <button 
                    onClick={onReset}
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
                    onClick={onReset}
                >
                    Recover {name}
                </button>
            </React.Fragment>
        );
    };
};


// lo primero que necesitamos es estado compuesto
const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false, // cambios de pantalla
    confirmation: false,
}; 

// los reducer son funciones que reciben 2 parametros: primero el estado (la primera vez el estado = initialState, despues va a ser el estaod con todas las actualizaciones dadas a la app). El segundo parametro es una accion.
// const reducer = (state, action) => {};

// 3 formas de crear un reducer:

// // 1) La mas obvia: usando 800000 ifs
// const reducerIf = (state, action) => {
//     // primero hay que validar el tipo de accion, ese tipo nos dira cual es el nuevo estado compuesto de la app, y de ahi si coincide el .type con el estado, pasar a ese estado.
//     if (action.type === "ERROR"){
//         return {...state, error: true, loading: false};
//     } else if (action.type === "CHECK") {
//         return {...state, loading: true}
//     } else if (action.type === "CONFIRM") {
//         return {...state, error: false, loading: false, confirmation: true}
//     } else if (action.type === "DELETE") {
//         return {...state, deleted: true}
//     } else if (action.type === "RESET") {
//         return {...state, deleted:false, confirmation: false, value: "",}
//     } else if (action.type === "WRITE") {
//         return {...state, value: newValue}
//     } else {
//         return {...state}
//     }
// } 



// // 2) usando un switch, es la forma mas popular de usar los reducers

// const reducerSwitch = (state, action) => {
//     switch(action.type){
//         case "ERROR": 
//             return {...state, error: true, loading: false};        
//         case "CHECK":
//             return {...state, loading: true};
//         case "CONFIRM":
//             return {...state, error: false, loading: false, confirmation: true};
//         case "DELETE":
//             return {...state, deleted: true};
//         case "RESET":
//             return {...state, deleted:false, confirmation: false, value: "",};
//         case "WRITE":
//             return {...state, value: newValue};
//         default:
//             return {...state};
//     };
// };



// 3) utilizando reducer objects

// retornando un objeto de forma implicita


// clase 15, creando un actionType
const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    check: "CHECK",
    delete: "DELETE",
    reset: "RESET",
    write: "WRITE"
}; 


// aca retornamos un objeto con todos los posibles estados (que tbn son objetos)
const reducerObject = (state, payload) => ({
    [actionTypes.error]: {...state, error: true, loading: false},
    [actionTypes.check]: {...state, loading: true},
    [actionTypes.confirm]: {...state, error: false, loading: false, confirmation: true},
    [actionTypes.delete]: {...state, deleted: true},
    [actionTypes.reset]: {...state, deleted:false, confirmation: false, value: "",},
    [actionTypes.write]: {...state, value: payload},
});

// usaremos esta funcion para elegir el estado que tenga = nombre que el action type, que estemos enviando desde la actualizacion del estado en nuestro componente
const reducer = (state, action) => {
    // valido si el action.type existe dentro del reducerObject
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
};

export {UseReducer};