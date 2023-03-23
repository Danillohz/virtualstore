import { useState } from "react"
import { Link } from "react-router-dom";
import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"

let numberId = 0;

function CeoView() {

    const [visibleCreateItens, setVisibleCreateItens] = useState(false);
    const [imgProductValue, setImgProduct] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [stockValue, setStockValue] = useState("");

    const [priceProductValue, setPriceProductValue] = useState(0);
    const [nameProductValue, setNameProductValue] = useState("");
    const [descriptionProductValue, setDescriptionProductValue] = useState("")

    

    //faz com que a criação dos itens apareça para o usuario
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

    const handlePrice = (event) => {
        setPriceProductValue(event.target.value);
    }
    const handleName = (event) => {
        setNameProductValue(event.target.value);
    }
    const handleDescription = (event) => {
        setDescriptionProductValue(event.target.value);
    }


    const handleClick = () => {
        const item = {
            id: numberId,
            name: nameProductValue,
            image: imgProductValue,
            descrição: descriptionProductValue,
            price: priceProductValue
        };

        setSelectedItems([...selectedItems, item]);
        setStockValue(stockValue - item.price);

        numberId = numberId + 1;
        
        
    }   

    console.log(imgProductValue)
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


            <div className=" Container-body-ceo">
                <header className="container-fluid">
                    <div className="position-absolute top-0 end-0 Img-Logo">
                        <img src={imgLogoCaipirinha} alt="logo"></img>
                    </div>
                    <button type="button" className="Button-Create-Itens" onClick={toggleVisibleCreateItem}>
                        +
                    </button>
                </header>

                {visibleCreateItens && (
                    <div className="container-sm Container-CreateItens">
                        <div className="Container-Img-Product  ">

                            {imgProductValue && (
                                <div className="Img-Product">

                                    <img src={imgProductValue} alt="Imagem Selecionada" className="img-fluid" />
                                </div>
                            )}

                            <label className="Label-Img-product" htmlFor="Input-Img-Product-Id">Enviar arquivo</label>
                            <input type="file" className="Input-Img-Product" id="Input-Img-Product-Id" name="Input-Img-Product" 
                            onChange={handleImgProduct}>
                                
                            </input>
                        </div>

                        <div className="w-75">
                            <div className="w-75 m-2">
                                <label htmlFor="InputNameProductId" className="form-label">Nome do produto:</label>
                                <input type="text" className="form-control form-control-sm" name="NameProduct" id="InputNameProductId" value={nameProductValue} onChange={handleName} />
                            </div>
                            <div className="w-75 m-2">

                                <label htmlFor="InputProductDescriptionId" className="form-label">Descrição do produto:</label>
                                <textarea className="form-control form-control-sm" id="InputProductDescriptionId" rows="6"
                                    value={descriptionProductValue} 
                                    onChange={handleDescription}>
                                </textarea>

                            </div>
                            <div className="w-75 m-2">
                                <div className="w-100">
                                    <label className="form-label">Valor do produto:</label>
                                    <input type="number" className="form-control form-control-sm mb-4 " value={priceProductValue} onChange={handlePrice} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-light mb-4 ms-2" onClick={handleClick}>Enviar</button>
                        </div>
                    </div>
                )}

                <h1>Cardápio</h1>
                <Link to="/login">login</Link>
                <div className="Ornament-Menu">
                    <div className="ItemCardápio">

                        <div className="container text-center">
                            <div className="row">

                                
                                {selectedItems.map(item => (
                                    <div className="col-sm-4" key={item.id}>
                                        
                                            <img src={item.image} alt="imgitem"></img>
                                            <p>{item.name}</p>
                                            <p>{item.descrição}</p>
                                            <p>{item.price}</p>
                                      
                                    </div>
                                ))}


                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default CeoView;