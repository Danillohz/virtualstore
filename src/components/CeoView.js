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
        };
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
                    <div className="Container-CreateItens">
                        <div class="input-group mb-2 mt-2 Container-Input-File ">
                            <input type="file" class="form-control" id="inputGroupFile02 inputGroup-sizing-sm" onChange={handleImgProduct} />
                            <label class="input-group-text" for="inputGroupFile02"></label>
                        </div>
                        {imgProductValue && (
                            <div className="Img-Product">
                                <img src={imgProductValue} alt="Imagem Selecionada" className=" img-fluid" />
                            </div>
                        )}
                    </div>
                )}

                <div className="Ornament-Menu"></div>
                <div className="container Container-MenuItens"></div>
            </div>
        </>
    )
}

export default CeoView