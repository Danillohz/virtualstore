import { useState } from "react"
import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"
import imgVazia from "../imagens/Fundo-transparente.png"
let numberId = 0;
var itemsSelected = undefined;


function CeoView() {
    

    const [visibleCreateItens, setVisibleCreateItens] = useState(false);
    const [visibleEditAndDeleteItems, setVisibleEditAndDeleteItems] = useState(false);
    const [visibleBtnSubmitCreateItems, setVisibleBtnSubmitCreateItems] = useState(false);
    const [visibleBtnSubmitEditItems, setVisibleBtnSubmitEditItems] = useState(false);
    const [emptyStockVisible, setEmptyStockVisible] = useState(true)
    const [itemSelectionIdentifier, setItemSelectionIdentifier] = useState("col-4")

    const [selectedItems, setSelectedItems] = useState([]);
    const [stockValue, setStockValue] = useState("");
    const [lastSelectedItem, setLastSelectedItem] = useState(null);
    const [penultimateSelectedItem, setPenultimateSelectedItem] = useState(null)

    const [imgProductValue, setImgProduct] = useState(imgVazia);
    const [priceProductValue, setPriceProductValue] = useState(0);
    const [nameProductValue, setNameProductValue] = useState("none");
    const [selectItemTypeValue, setSelectItemTypeValue] = useState("none")



    //faz com que a criação dos itens apareça para o usuario
    const toggleVisibleCreateItem = () => {
        setVisibleCreateItens(!visibleCreateItens)
        setVisibleBtnSubmitCreateItems(true)
        setVisibleBtnSubmitEditItems(false)


    }

    //da um valor para imgProductValue e muda a imagem com o mesmo valor
    const handleImgProduct = (event) => {


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
    const handleCreateItem = () => {


        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(priceProductValue)

        const item = {
            id: numberId,
            name: nameProductValue,
            image: imgProductValue,
            type: selectItemTypeValue,
            price: formattedPrice,
            focus: "col-4"

        };

        setSelectedItems([...selectedItems, item]);
        setStockValue(stockValue - item.price);


        numberId = numberId + 1;

        setImgProduct(imgVazia)
        setNameProductValue("none")
        setSelectItemTypeValue("none")
        setPriceProductValue(0)

        setEmptyStockVisible(selectedItems.length  < 0)

    }

    //identifica que item está selecionado

    function handleCheckBoxChange(item) {

        item.selected = !item.selected;
        
        if(item.focus === "col-4"){
            item.focus = "col-4 Items"
        }else{
            item.focus = "col-4"
        }

        itemsSelected = selectedItems.filter(item => item.selected)
        setVisibleEditAndDeleteItems(itemsSelected.length > 0)

        setSelectedItems(prevSelectedItems => {
            const itemIndex = prevSelectedItems.findIndex(selectedItem => selectedItem.id === item.id);

            if (itemIndex !== -1) {
                // O item já está na lista de itens selecionados, atualiza o estado
                const updatedSelectedItems = [...prevSelectedItems];
                updatedSelectedItems[itemIndex] = item;
                return updatedSelectedItems;
            } else if (item.selected) {
                // Adiciona o item à lista de itens selecionados
                return [...prevSelectedItems, item];
            }

            return prevSelectedItems;
        });

        if (item.selected) {
            // Atualiza o último e o penúltimo item selecionado
            setPenultimateSelectedItem(lastSelectedItem);
            setLastSelectedItem(item);
        } else if (lastSelectedItem !== null && lastSelectedItem.id === item.id) {
            // A checkbox do último item selecionado foi desmarcada
            setLastSelectedItem(penultimateSelectedItem);
            setPenultimateSelectedItem(selectedItems[selectedItems.length - 2] || null);
        }

        
        console.log(selectedItems)
        
    }

    


    //Vê os items que estão com checkbox(true), e deixa somente quem não está

    const handleDeleteItemClick = () => {

        const itemsToKeep = selectedItems.filter(item => !item.selected);
        setSelectedItems(itemsToKeep);
        
        setVisibleEditAndDeleteItems(false)
        setEmptyStockVisible(itemsToKeep.length === 0)

    }

    //Deixa visivel o edit itens e muda os nomes para o primeiro item clicado

    const visibleEditItems = () => {
        setVisibleCreateItens(!visibleCreateItens);
        setVisibleBtnSubmitEditItems(true);
        setVisibleBtnSubmitCreateItems(false);


        const selectedNames = [];
        const selectedType = [];
        const selectedPrice = [];
        const selectedImg = [];

       

        selectedNames.push(lastSelectedItem.name);
        selectedType.push(lastSelectedItem.type);
        selectedPrice.push(lastSelectedItem.price.match(/\d+/)[0]);
        selectedImg.push(lastSelectedItem.image);

        setNameProductValue(selectedNames || '');
        setSelectItemTypeValue(selectedType[0] || '');
        setPriceProductValue(selectedPrice || '');
        setImgProduct(selectedImg || '')


    }


    //Muda o item quando clicado no botão de editar dentro do createItems
    const handleEditItem = () => {

        let allItens = selectedItems;

        //muda o price pelo padrão real 
        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(priceProductValue)

        //Seta os props do lastSelectedItem para o que colocar no form
        lastSelectedItem.name = nameProductValue
        lastSelectedItem.type = selectItemTypeValue
        lastSelectedItem.price = formattedPrice
        lastSelectedItem.image = imgProductValue

        //ve se há um id igual e caso seja aplica para aql item 
        if (lastSelectedItem.id === selectedItems.find(item => item.id)) {
            allItens.name = lastSelectedItem.name
            allItens.type = lastSelectedItem.type
            allItens.price = lastSelectedItem.price
            allItens.img = lastSelectedItem.image
        }

        setSelectedItems(allItens)
        setVisibleCreateItens(!visibleCreateItens);

        setImgProduct(imgVazia)
        setNameProductValue("none")
        setSelectItemTypeValue("none")
        setPriceProductValue(0)

    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


            <div className=" Container-body-ceo">
                <header className="Header-Ceo">

                    <div className="position-absolute top-0 end-0 me-2 Img-Logo">
                        <img src={imgLogoCaipirinha} alt="logo"></img>
                    </div>
                    <button type="button" className="position-absolute top-0 start-0 w-1 Button-Create-Itens" onClick={toggleVisibleCreateItem}>
                        +
                    </button>

                </header>

                {visibleCreateItens && (
                    <div className="container-sm Container-CreateItens">
                        <div className="ms-1">
                            <div className="Container-Img-Product-Create">

                                {imgProductValue && (
                                    <div className="Img-Product-Create">
                                        <img src={imgProductValue} alt="Imagem Selecionada" className="img-fluid" />
                                    </div>
                                )}
                                <label className="Label-Img-product-Create" htmlFor="Input-Img-Product-Id">Enviar arquivo</label>
                                <input type="file" className="Input-Img-Product-Create" id="Input-Img-Product-Id" name="Input-Img-Product"
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

                                {visibleBtnSubmitCreateItems && !visibleBtnSubmitEditItems ? (
                                    <button type="submit" className="btn btn-light mb-4" onClick={handleCreateItem}>Enviar</button>
                                ) : <button type="submit" className="btn btn-light mb-4" onClick={handleEditItem}>Editar</button>}
                            </div>
                        </div>
                    </div>
                )}

                <h1>Estoque</h1>

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />


                {/*Torna visível o delete e o edit de um item caso tenha alguma checkbox marcada */}
                {visibleEditAndDeleteItems && (
                    <div className="row z-3  Container-btn-Edit-Delete">
                        <div className="col p-0"> <button className="btn btn-danger" type="button" onClick={handleDeleteItemClick}><span className="material-symbols-outlined">
                            close
                        </span></button>
                            <div className="mt-2 p-0"> <button className="btn btn-warning" type="button" onClick={visibleEditItems}><span className="material-symbols-outlined">
                                edit
                            </span></button></div>
                        </div>
                        <div className="col p-0 ps-1"><span className="material-symbols-outlined Arrow-EditAndExclude">
                            arrow_forward_ios
                        </span></div>
                    </div>
                )}
                <div className="Ornament-Menu">

                   {emptyStockVisible ? (
                    <div className="row-2 Item-Not-Found">
                        <div className="col"><div>(;-;)</div></div>
                        <div className="col"><h1>Nenhum item no estoque.</h1></div>
                        
                    </div>
                    

                   ):
                    <div className="Items-Estoque">

                        <div className="container">
                            <div className="row">


                                {selectedItems.map(item => (
                                    <div className={item.focus} key={item.id}>

                                        <img src={item.image} alt="imgitem"></img>
                                        <div className="Container-CaracteristicasItens">

                                            <li><p className="Name-Product">{item.name}</p></li>
                                            <li><p className="Description-Product">{item.type}</p></li>
                                            <li><p className="Price-Product">{item.price}</p></li>

                                            <label></label>
                                            <input type="checkbox" className="position-absolute top-0 start-100 translate-middle" checked={item.select} onChange={() => handleCheckBoxChange(item)}></input>

                                        </div>

                                    </div>
                                ))}


                            </div>

                        </div>

                    </div>
                    }
                    
                </div>
                

            </div>
        </>
    )
}

export default CeoView;