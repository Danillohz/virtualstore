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
                    <div className="container-sm Container-CreateItens">
                        <div className="Container-Img-Product  ">
                        
                            {imgProductValue && (
                                <div className="Img-Product">
                                    
                                    <img src={imgProductValue} alt="Imagem Selecionada" className="img-fluid" />
                                </div>
                            )}

                            <label className="Label-Img-product" htmlFor="Input-Img-Product-Id">Enviar arquivo</label>
                            <input type="file" className="Input-Img-Product" id="Input-Img-Product-Id" name="Input-Img-Product" onChange={handleImgProduct}></input>
                        </div>

                        <div className="w-75">
                            <div class="w-75 m-2">
                                <label for="InputNameProductId" class="form-label">Nome do produto:</label>
                                <input type="text" class="form-control form-control-sm" name="NameProduct" id="InputNameProductId"/>
                            </div>
                            <div class="w-75 m-2">
                                <label for="InputProductDescriptionId" class="form-label">Descrição do produto:</label>
                                <textarea class="form-control form-control-sm" id="InputProductDescriptionId" rows="6"></textarea>
                            </div>
                            <div class="w-75 m-2">
                                <div class="w-100">
                                    <label class="form-label">Valor do produto:</label>
                                    <input type="number" className="form-control form-control-sm mb-4 " />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-light mb-4 ms-2">Enviar</button>
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