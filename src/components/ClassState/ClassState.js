import React from "react";
import { Loading } from "../Loading/Loading.js";

// al ser todo mayuscula indicamos que nunca el valor almacenado cambiara, es una convencion nada mas
const SECURITY_CODE = "paradigma";

class ClassState extends React.Component{
    // recibir propiedades: this.props.propiedadtal

    // creando constructor
    constructor(props){
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: "",
        };
    }

    // metodos del ciclo de vida = useEffect, willmount y didmount no se ejecutan en cada cambio de estado, si quisieramos que se ejecuten en cada cambio de estado, tenemos el didUpdate, este metodo tbn ignora la ejecucion en la primer renderizacion.

    // // componente se montara
    // UNSAFE_componentWillMount() {
    //     console.log("componentWillMount")
    // }

    // // componente se ha montado
    // componentDidMount() {
    //     console.log("componentDidMount")
    // }

    componentDidUpdate(){
        console.log("actualizando");

        if(!!this.state.loading){
            
            setTimeout(() => {
                console.log("Inicio");
                
                if (SECURITY_CODE === this.state.value) {
                    this.setState({error: false, loading: false});
                } else {
                    this.setState({error: true, loading: false});
                };

                console.log("Fin");
            }, 2000);
        }
    }




    // metodo render: renderiza lo que le metamos dentro
    render(){
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                <p>Please write the security code to delete ClassState</p>

                {(this.state.error && !this.state.loading ) && (<p>ERROR: The security code is incorrect</p>)}

                {this.state.loading && (<Loading></Loading>)}

                <input 
                    placeholder="Security code..." 
                    value={this.state.value}
                    onChange={
                        (evento) => {
                            this.setState({value: evento.target.value})
                        }
                    }
                />
                <button
                    onClick={()=>{
                        this.setState({loading: true}) 
                    }}
                >
                    Comprobar
                </button>
            </div>
        );
    }
};

export {ClassState};