// lo primero que necesitamos es estado compuesto
const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false, // cambios de pantalla
    confirmation: false,
}; 

// los reducer son funciones que reciben 2 parametros: primero el estado (la primera vez el estado = initialState, despues va a ser el estaod con todas las actualizaciones dadas a la app). El segundo parametro es una accion.


// const reducer = (state, action) => {

// };

// 3 formas de crear un reducer:

// 1) La mas obvia: usando 800000 ifs
// const reducer = (state, action) => {
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



// 2) usando un switch, es la forma mas popular de usar los reducers

// const reducer = (state, action) => {
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

// aca retornamos un objeto con todos los posibles estados (que tbn son objetos)
// const reducerObject = (state) => ({
//     "ERROR": {...state, error: true, loading: false},
//     "CHECK": {...state, loading: true},
//     "CONFIRM": {...state, error: false, loading: false, confirmation: true},
//     "DELETE": {...state, deleted: true},
//     "RESET": {...state, deleted:false, confirmation: false, value: "",},
//     "WRITE": {...state, value: newValue},

// });

// // usaremos esta funcion para elegir el estado que tenga = nombre que el action type, que estemos enviando desde la actualizacion del estado en nuestro componente
// const reducer = (state, action) => {
//     // valido si el action.type existe dentro del reducerObject
//     if(reducerObject(state)[action.type]){
//         return reducerObject(state)[action.type]
//     } else {
//         return state
//     }
// };