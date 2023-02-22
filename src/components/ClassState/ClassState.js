import React from "react";

class ClassState extends React.Component{
    // recibir propiedades: this.props.propiedadtal

    // creando constructor
    constructor(props){
        super(props);
        this.state = {
            error: true,
        };
    }

    // metodo render: renderiza lo que le metamos dentro
    render(){
        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                <p>Please write the security code to delete ClassState</p>

                {this.state.error && (<p>ERROR: The security code is incorrect</p>)}

                <input placeholder="Security code..." />
                <button
                    onClick={()=>{
                        this.setState( prevState => ({error: !prevState.error})) // los () antes del {error: !prevState.error} indican un return implicito en arrow functions
                    }}
                >Comprobar</button>
            </div>
        );
    }
};

export {ClassState};