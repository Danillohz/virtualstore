import { useState } from "react"
import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"


function CeoView() {

    const [visibleCreateItens, setVisibleCreateItens] = useState(true);
    const [imgProductValue, setImgProduct] = useState(null);

    function toggleVisibleCreateItem() {
        setVisibleCreateItens(!visibleCreateItens)

    }

    //da um valor para imgProductValue e muda a imagem com o mesmo valor
    function handleImgProduct(event) {


        const file = event.target.files[0];
        const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgProduct(reader.result);
          
        }
    }

    console.log(imgProductValue)
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


            <div className="Body-Ceo">
                <header className="container-fluid">
                    <div className="position-absolute top-0 end-0 Img-Logo">
                        <img src={imgLogoCaipirinha} alt="logo"></img>
                    </div>
                    <button type="button" className="Button-Create-Itens" onClick={toggleVisibleCreateItem}>
                        +
                    </button>
                </header>

                <h1>Cardápio</h1>

                {visibleCreateItens && (
                    <div className="container-sm position-absolute top-50 start-50 Container-CreateItens">
                        <div className="position-absolute top-0 end-0 m-2 Container-Img-Product">

                            {imgProductValue && (
                                <div className="Img-Product">
                                    <img src={imgProductValue} alt="Imagem Selecionada" className="" />
                                </div>
                            )}

                            <label className="Label-Img-product" htmlFor="Input-Img-Product-Id">Enviar arquivo</label>
                            <input type="file" className="Input-Img-Product" id="Input-Img-Product-Id" name="Input-Img-Product" onChange={handleImgProduct}></input>
                        </div>

                        <div className="w-75">
                            <div className="w-75 m-2">
                                <label htmlFor="InputNameProductId" className="form-label">Nome do produto:</label>
                                <input type="text" className="form-control" name="NameProduct" id="InputNameProductId"></input>
                            </div>
                            <div className="w-75 m-2">
                                <label htmlFor="InputProductDescriptionId" className="form-label">Descrição do produto:</label>
                                <textarea className="form-control" id="InputProductDescriptionId" rows="6"></textarea>
                            </div>
                            <div className="w-75 m-2">

                                <div className="w-100">
                                    <label className="form-label">Valor do produto:</label>
                                    <div className="input-group mb-3 w-100">
                                        <button type="button" className="btn btn-outline-secondary">Action</button>
                                        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="a">$</a></li>
                                            <li><a className="dropdown-item" href="a">Another action</a></li>
                                            <li><a className="dropdown-item" href="a">Something else here</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="a">Separated link</a></li>
                                        </ul>
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>





                            </div>
                        </div>

                    </div>
                )}

                <div className="Ornament-Menu"></div>
                <div className="container Container-MenuItens"></div>
            </div>
        </>
    )
}

export default CeoView