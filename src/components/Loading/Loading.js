import React from "react";

class Loading extends React.Component{
    // componente se desmontara
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }


    // metodo render: renderiza lo que le metamos dentro
    render(){
        return (
            <p>Cargando...</p>
        );
    }
};

export {Loading};