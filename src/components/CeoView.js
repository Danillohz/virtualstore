import { useState } from "react"
import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"
import imgVazia from "../imagens/image.png"
let numberId = 0;
const itemsSelected = undefined

function CeoView() {

    const [visibleCreateItens, setVisibleCreateItens] = useState(false);
    const [visibleEditItens, setVisibleEditItens] = useState(false);
    const [imgProductValue, setImgProduct] = useState(imgVazia);
    const [selectedItems, setSelectedItems] = useState([]);
    const [stockValue, setStockValue] = useState("");

    const [priceProductValue, setPriceProductValue] = useState(0);
    const [nameProductValue, setNameProductValue] = useState("none");
    const [selectItemTypeValue, setSelectItemTypeValue] = useState("none")

    

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

    //muda o valor quando feito qualquer ação nos botões

    const handlePrice = (event) => {
        setPriceProductValue(event.target.value)

    }
    const handleName = (event) => {
        setNameProductValue(event.target.value);
    }
    const handleSelectItem = (event) => {
        setSelectItemTypeValue(event.target.value);
    }

    // cria o item na tela quando clickar no botão de Enviar
    const handleClick = () => {

        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(priceProductValue)

        const item = {
            id: numberId,
            name: nameProductValue,
            image: imgProductValue,
            type: selectItemTypeValue,
            price: formattedPrice

        };

        setSelectedItems([...selectedItems, item]);
        setStockValue(stockValue - item.price);

        console.log(selectedItems)
        numberId = numberId + 1;

    }

    //identifica que item está selecionado

    function handleCheckBoxChange(item) {
       
        item.selected = !item.selected
        
        //Ve se tem checkbox ativada se tiver torna visivel a barra para excluir e editar itens
        const itemsSelected = selectedItems.filter(item => item.selected)
        setVisibleEditItens(itemsSelected.length > 0)
        console.log(itemsSelected)
    }

    //Deleta qualquer item que estiver checkbox(true)

    const handleDeleteItemClick = () => {
        setVisibleEditItens(itemsSelected?.length > 0)

        const itemsToKeep = selectedItems.filter(item => !item.selected );
        setSelectedItems(itemsToKeep);
        
    }

    //Edita qualquer item que estiver checkbox(true) Obs:edita todos se estiverem precionados

    const handleEditItensClick = () => {
        
        if(itemsSelected !== undefined){
            setVisibleEditItens(true)
        }
        else{
            setVisibleEditItens(false)
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


            <div className=" Container-body-ceo">
                <header className="container-fluid">
                    
                        <div className="position-absolute top-0 end-0  Img-Logo">
                            <img src={imgLogoCaipirinha} alt="logo"></img>
                        </div>
                        <button type="button" className="Button-Create-Itens" onClick={toggleVisibleCreateItem}>
                            +
                        </button>
                   
                </header>

                {visibleCreateItens && (
                    <div className="container-sm Container-CreateItens">
                        <div className="ms-1">
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
                                <div className="w-75">
                                    <label htmlFor="InputNameProductId" className="form-label">Nome do produto:</label>
                                    <input type="text" className="form-control form-control-sm" name="NameProduct" id="InputNameProductId" value={nameProductValue} onChange={handleName} />
                                </div>

                                <label htmlFor="Select-TypeComponent" className="form-label">Tipo do produto:</label>
                                <div className="w-50">
                                    <select className="form-select" id="Select-TypeComponent" value={selectItemTypeValue} onChange={handleSelectItem}>
                                        <option value="">Selecione</option>
                                        <option value="Fruta">Fruta</option>
                                        <option value="Bebida">Bebida</option>
                                        <option value="Adicional">Adicional</option>
                                    </select>
                                </div>

                                <label className="form-label">Valor do produto:</label>
                                <div className="w-25">
                                    <input type="number" className="form-control form-control-sm mb-4 " value={priceProductValue} onChange={handlePrice} />

                                </div>
                                <button type="submit" className="btn btn-light mb-4" onClick={handleClick}>Enviar</button>
                            </div>
                        </div>
                    </div>
                )}

                <h1>Cardápio</h1>

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

            {visibleEditItens && (
                <div className="position-absolute end-0 translate-middle-y z-3 Container-btn-Edit-Delete">
                    <div className="col"> <button className="btn btn-danger" type="button" onClick={handleDeleteItemClick}><span className="material-symbols-outlined">
                        close
                    </span></button> </div>
                    <div className="col mt-2"> <button className="btn btn-warning" type="button" onClick={handleDeleteItemClick}><span className="material-symbols-outlined">
                        edit
                    </span></button></div>
                </div>
                )}
                <div className="Ornament-Menu">

                    <div className="ItemCardápio">

                        <div className="container">
                            <div className="row">


                                {selectedItems.map(item => (
                                    <div className="col-4" key={item.id}>

                                        <img src={item.image} alt="imgitem"></img>
                                        <div className="Container-CaracteristicasItens">

                                            <li><p className="Name-Product">{item.name}</p></li>
                                            <li><p className="Description-Product">{item.type}</p></li>
                                            <li><p className="Price-Product">{item.price}</p></li>
                                            <div className="">
                                                <label></label>
                                                <input type="checkbox" className="position-absolute bottom-0 end-0" checked={item.select} onChange={() => handleCheckBoxChange(item)}></input>
                                            </div>
                                        </div>

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