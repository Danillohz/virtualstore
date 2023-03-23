import { Link } from "react-router-dom";

//Página inicial
function Home() {
    return(

            <div className="d-flex justify-content-center">
                <div className="position-absolute top-50 start-50 translate-middle align-items-center justify-content-center Container-Home">
                
                        <h1>Opss...</h1>
                        <p>É necessário efetuar um <Link to="/login">login</Link> para continuar</p>
                    </div>
            </div>

        
    
    )
}

export default Home;