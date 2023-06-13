import LoadingScreen from "../../Loading/LoadingScreen"
import imgLogoCaipirinha from "../../../imagens/Logo-Caipirinha-Preto-Meia.png"
import { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.min.js';


import pineappleImg from "../../../imagens/fruits/abacaxiP.png"
import lemonImg from "../../../imagens/fruits/limaoP.png"
import stranwberryImg from "../../../imagens/fruits/morangoP.png"
import passionImg from "../../../imagens/fruits/maracujaP.png"
import Número1Img from "../../../imagens/numeros/Número1Img.png"
import Número2Img from "../../../imagens/numeros/Número2Img.png"
import Número3Img from "../../../imagens/numeros/Número3Img.png"
import Número4Img from "../../../imagens/numeros/Número4Img.png"

import './ClientView.css'
import { useNavigate } from "react-router-dom";

let fruitEvent;
let drinkEvent;
let additionalEvent;
let secondAdditionalEvent;

let formattedFinalTotalAmount;
let formattedPrice;
let finalTotalAmount = 0

let numberId = 0;
let itemNumber = 1;


function ClientView() {

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    }, []);

    const navigate = useNavigate();

    const [allItems, setAllItems] = useState([])
    const [stockValue, setStockValue] = useState("")

    const [drinkAnimReplay, setDrinkAnimReplay] = useState("toFill")
    const [additionalAnimReplay, setAdditionalAnimReplay] = useState("toFill")

    const [isVisibleShoppingCart, setvisibleShoppingCart] = useState(false)
    const [animSecondStep, setAnimSecondStep] = useState("")
    const [animThirdStep, setAnimThirdStep] = useState("")

    const [typeDrinkValue, setTypeDrinkValue] = useState("")
    const [fruitValue, setFruitValue] = useState("")
    const [secondfruitValue, setSecondFruitValue] = useState("")
    const [additionalValue, setAdditionalValue] = useState("")
    const [secondAdditionalValue, setSecondAdditionalValue] = useState("")
    const [backgroundDrinkColor, setBackgroundDrinkColor] = useState("")
    const [backgroundAdditionalColor, setBackgroundAdditionalColor] = useState("")
    const [backgroundSecondAdditionalColor, setBackgroundSecondAdditionalColor] = useState("")
    const [fruitImg, setFruitImg] = useState("")
    const [secondFruitImg, setSecondFruitImg] = useState("")

    const [secondSelectFruitVisible, setSecondSelectFruitVisible] = useState(false)
    const [secondSelectAdditionalVisible, setSecondSelectAdditionalVisible] = useState(false)

    const [totalOrderAmont, setTotalOrderAmont] = useState(12)

    //Deixa o carrinho e seus itens escolhidos visíveis.
    const toggleVisibleShoppingCart = () => {
        setvisibleShoppingCart(!isVisibleShoppingCart)
    }

    //Muda o o valor do tipo de bebida alterando a cor do fundo do copo
    const selectTypeDrink = (event) => {
        setTypeDrinkValue(event.target.value);

        switch (event.target.value) {
            case "Vodka":
                setBackgroundDrinkColor('#e1e1e162')
                break
            case "Vinho":
                setBackgroundDrinkColor('#5e2129ee')
                break
            case "Cachaça":
                setBackgroundDrinkColor('#d69a6cee')
                break
            default:
                setBackgroundDrinkColor('transparent')
                break
        }

        //replay da animação
        if (drinkAnimReplay === "toFill") {
            setDrinkAnimReplay("secondToFill")
        }
        else if (drinkAnimReplay === "secondToFill") {
            setDrinkAnimReplay("toFill")
        }

        //faz surgir o segundo passo de escolha do pedido
        drinkEvent = event.target.value
        selectedSelectors()

    }

    const selectFruitType = (event) => {
        setFruitValue(event.target.value)

        switch (event.target.value) {
            case "Morango":
                // Defina a imagem de fundo para a opção "Morango"
                setFruitImg(stranwberryImg);
                break;
            case "Abacaxi":
                // Defina a imagem de fundo para a opção "Abacaxi"
                setFruitImg(pineappleImg);
                break;
            case "Limão":
                // Defina a imagem de fundo para a opção "Limao"
                setFruitImg(lemonImg);
                break;
            case "Maracujá":
                // Defina a imagem de fundo para a opção "Maracuja"
                setFruitImg(passionImg);
                break;
            case "Coco":
                // Defina a imagem de fundo para a opção "Coco"

                break;
            default:
                setFruitImg("");
                break;
        }

        //faz surgir o segundo passo de escolha do pedido
        fruitEvent = event.target.value
        selectedSelectors()
    }

    const selectSecondFruitType = (event) => {
        setSecondFruitValue(event.target.value)

        switch (event.target.value) {
            case "Morango":
                // Defina a imagem de fundo para a opção "Morango"
                setSecondFruitImg(stranwberryImg);
                break;
            case "Abacaxi":
                // Defina a imagem de fundo para a opção "Abacaxi"
                setSecondFruitImg(pineappleImg);
                break;
            case "Limão":
                // Defina a imagem de fundo para a opção "Limao"
                setSecondFruitImg(lemonImg);
                break;
            case "Maracujá":
                // Defina a imagem de fundo para a opção "Maracuja"
                setSecondFruitImg(passionImg);
                break;
            case "Coco":
                // Defina a imagem de fundo para a opção "Coco"

                break;
            default:
                setSecondFruitImg("");
                break;
        }

        selectedSelectors()

    }

    const selectTypeAdditional = (event) => {
        setAdditionalValue(event.target.value)

        switch (event.target.value) {
            case "Leite Condensado":
                setBackgroundAdditionalColor("#f0e6bbbf")
                break;
            case "Yakut":
                setBackgroundAdditionalColor("#ffffffa1")
                break;

            default:
                setBackgroundAdditionalColor("")
                break;
        }

        AdditionalAnimReplay()

        additionalEvent = event.target.value
        selectedSelectors();
    }

    const selectSecondTypeAdditional = (event) => {
        setSecondAdditionalValue(event.target.value)

        switch (event.target.value) {
            case "Leite Condensado":
                setBackgroundSecondAdditionalColor("#f0e6bbbf")
                break;
            case "Yakut":
                setBackgroundSecondAdditionalColor("#ffffffa1")
                break;

            default:
                setBackgroundSecondAdditionalColor("")
                break;
        }

        AdditionalAnimReplay()



    }

    function AdditionalAnimReplay() {

        //replay da animação
        if (additionalAnimReplay === "toFill") {
            setAdditionalAnimReplay("secondToFill")
        }
        else if (additionalAnimReplay === "secondToFill") {
            setAdditionalAnimReplay("toFill")
        }
    }

    function selectedSelectors() {

        //faz surgir o segundo passo de escolha do pedido
        if (drinkEvent === undefined || fruitEvent === undefined || drinkEvent === "" || fruitEvent === "") {
            setAnimSecondStep("")
            additionalEvent = undefined

        } else {
            setAnimSecondStep("isVisibleOrNot")

        }

        //faz surgir o terceiro passo de escolha do pedido
        if (additionalEvent === undefined || additionalEvent === "") {
            setAnimThirdStep("")


        } else if (additionalEvent === "Nenhum") {

            setAnimThirdStep("isVisibleOrNot")


        } else {
            setAnimThirdStep("isVisibleOrNot")


        }

        //Muda o preço total
        if ((additionalEvent === "" || additionalEvent === undefined || additionalEvent === "Nenhum") && (secondAdditionalEvent === "" || secondAdditionalEvent === undefined)) {
            setTotalOrderAmont(12);
        } else if ((additionalEvent !== "" && additionalEvent !== undefined && additionalEvent !== "Nenhum") && (secondAdditionalEvent !== "" && secondAdditionalEvent !== undefined)) {
            setTotalOrderAmont(16);
        } else {
            setTotalOrderAmont(14);
        }
    }

    //Formata o preço do produto para o padrão BR
    formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalOrderAmont)

    //Envia o item para o carrinho
    const handleCreateItemCart = () => {

        if ((drinkEvent !== undefined || fruitEvent !== undefined || additionalEvent !== undefined) && fruitValue !== secondfruitValue && additionalValue !== secondAdditionalValue) {
            const item = {
                id: numberId,
                itemNumber: itemNumber,
                drinkName: typeDrinkValue,
                fruitName: fruitValue,
                secondFruitName: secondfruitValue,
                additionalName: additionalValue,
                secondAdditionalName: secondAdditionalValue,
                productPrice: formattedPrice,
                productPriceNumber: totalOrderAmont


            };

            setAllItems([...allItems, item]);
            setStockValue(stockValue - item.price);

            finalTotalAmount = finalTotalAmount + totalOrderAmont;

            formattedFinalTotalAmount = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(finalTotalAmount)

            numberId++;
            itemNumber++;

            setTypeDrinkValue("")
            setFruitValue("")
            setSecondFruitValue("")
            setAdditionalValue("")
            drinkEvent = undefined
            fruitEvent = undefined
            additionalEvent = undefined
            selectedSelectors()

            setTotalOrderAmont(0)

            console.log(drinkEvent)
            console.log(fruitEvent)
            console.log(additionalEvent)
        }
        else if (fruitValue === secondfruitValue || additionalValue === secondAdditionalValue) {
            window.alert("O adicional ou as frutas tem que ser diferentes")
        }
        else {
            window.alert("Conclua todas etapas")
        }

    }

    const handleDeleteItemCart = (item) => {

        //Filtra os items para excluir aquele que foi clicado
        const itemsNotDeleted = allItems.filter((cartItem) => cartItem.id !== item.id);
        // Atualiza os itemNumber dos itens restantes
        const updatedItems = itemsNotDeleted.map((cartItem, index) => ({
            ...cartItem,
            itemNumber: index + 1,
        }));
        setAllItems(updatedItems);



        finalTotalAmount = finalTotalAmount - item.productPriceNumber;

        formattedFinalTotalAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(finalTotalAmount)

    }

    //Botão de ir para compra caso o carrinho não esteja vazio 
    const goForPurchase = () => {

        if (allItems.length >= 1) {
            navigate('/payment');
        } else {
            window.alert("O Carrinho está vazio")
        }
    }

    //Style para mudar a cor do fundo do copo
    const drinkStyle = {
        color: backgroundDrinkColor,
        animationName: drinkAnimReplay
    }
    //W
    const FruitStyle = {
        backgroundImage: `url(${fruitImg})`
    }
    //
    const secondFruitStyle = {
        backgroundImage: `url(${secondFruitImg})`
    }
    //Style para mudar a cor do addicional no fundo do copo
    const additionalStyle = {
        color: backgroundAdditionalColor,
        animationName: additionalAnimReplay
    }
    const secondAditionalStyle = {
        color: backgroundSecondAdditionalColor,
        animationName: additionalAnimReplay
    }
    //Ativa a opacidade do segundo passo
    const visibleSecondStep = {
        animationName: animSecondStep
    }
    //Ativa a opacidade do terceiro e do quarto
    const visibleThirdStep = {
        animationName: animThirdStep
    }

    return (
        <>


            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

            <div className="Container-body-Client">
                <LoadingScreen value={1000 * 0}></LoadingScreen>
                <header className="Header-Ceo">
                    <div className="position-absolute Img-Logo">
                        <img className="ms-2" src={imgLogoCaipirinha} alt="logo"></img>
                    </div>
                    <button type="button" className="position-absolute top-0 end-0 w-1 Button-Create-Itens" onClick={toggleVisibleShoppingCart}>
                        <span className="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </button>
                </header>
                {isVisibleShoppingCart && (
                    <div className="row z-1 m-auto Container-Shopping-Cart">
                        <div className="row col position-relative Items-Cart"><p>Itens:</p>
                            {allItems.map(item => (
                                <div className="col z-2 Item" key={item.id}>
                                    <div>
                                        <div className="row">
                                            <li className="col"><p className="Number">{item.itemNumber}</p></li>
                                            <div className="col Delete-Item">
                                                <button onClick={() => handleDeleteItemCart(item)}>delete</button>
                                            </div>
                                        </div>
                                        <div className="Inverse-Product">
                                            <li><p className="Drink-Name"> Caipirinha de {item.drinkName}</p></li>
                                            <li><p className="Fruit-Name">- {item.fruitName}</p></li>
                                            {(item.secondFruitName !== undefined && item.secondFruitName !== "") && (
                                                <li><p className="Fruit-Name">- {item.secondFruitName}</p></li>
                                            )}
                                            <li><p className="Additional-Name">- {item.additionalName}</p></li>
                                            {(item.secondAdditionalName !== undefined && item.secondAdditionalName !== "") && (
                                                <li><p className="Additional-Name">- {item.secondAdditionalName}</p></li>
                                            )}
                                            <li><p className="Product-Price">Valor: {item.productPrice}</p></li>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="Purchase">
                            <div className="Amount">
                                <p>Valor Total: {formattedFinalTotalAmount}</p>
                            </div>


                            <div className="Purchase-Btn">
                                <button type="submit" className="btn btn-light" onClick={goForPurchase}>Comprar</button>
                            </div>


                        </div>




                    </div>
                )}
                <div className="row m-auto Container-Items-And-Opcoes">
                    <div className="col Container-Item">

                        <div className="mb-5 Glass-Item">


                            <div style={FruitStyle} className="Fruit-Background">
                                <div style={secondFruitStyle} className="Second-Fruit-Background">
                                    <div style={additionalStyle} className=" Glass-Additional">
                                        <div style={secondAditionalStyle} className=" Glass-SecondAdditional">
                                            <div className=" Glass-Background-Color">
                                                <div style={drinkStyle} className="Drink-Background"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>
                    <div className="col Container-Options-Item">

                        <div className="Container-Options-select">


                            <img src={Número1Img} alt=""></img>
                            <div className="Informative-Texts">
                                <p>Escolha uma bebida e uma fruta:</p>
                            </div>

                            <select className="form-select mt-2" id="Select-TypeDrink" value={typeDrinkValue} onChange={selectTypeDrink}>

                                <option value="">Bebida</option>
                                <option value="Vodka">Vodka</option>
                                <option value="Vinho">Vinho</option>
                                <option value="Cachaça">Cachaça</option>
                            </select>


                            <select className="mt-1 form-select" id="Select-TypeFruit" value={fruitValue} onChange={selectFruitType}>
                                <option value="">Fruta</option>
                                <option value="Morango">Morango</option>
                                <option value="Abacaxi">Abacaxi</option>
                                <option value="Limão">Limão</option>
                                <option value="Maracujá">Maracujá</option>

                            </select>

                            <div className="d-flex mt-1 align-items-center Container-Fruit-Selector">
                                {secondSelectFruitVisible && (
                                    <select className="me-1 form-select" id="Select-TypeFruit" value={secondfruitValue} onChange={selectSecondFruitType}>
                                        <option value="">Fruta</option>
                                        <option value="Morango">Morango</option>
                                        <option value="Abacaxi">Abacaxi</option>
                                        <option value="Limão">Limão</option>
                                        <option value="Maracujá">Maracujá</option>

                                    </select>
                                )}
                                {!secondSelectFruitVisible ? (

                                    <button className=" btn btn-light" onClick={() => { setSecondSelectFruitVisible(!secondSelectFruitVisible) }} >+</button>

                                ) : (<button className=" btn btn-danger" onClick={() => { setSecondSelectFruitVisible(!secondSelectFruitVisible); setSecondFruitValue(undefined) }}>x</button>)}
                            </div>


                            <div style={visibleSecondStep} className="Informative-Div-inverse">
                                <img src={Número2Img} alt=""></img>
                                <div className="Informative-Texts">
                                    <p>Escolha seu adicional</p>
                                </div>

                                <select style={visibleSecondStep} className="form-select mt-2" id="Select-TypeAdditional" value={additionalValue} onChange={selectTypeAdditional}>
                                    <option value="">Adicional</option>
                                    <option value="Leite Condensado">Leite Condensado</option>
                                    <option value="Yakut">Yakut</option>
                                    <option value="Nenhum">Nenhum</option>
                                </select>


                                <div className="d-flex mt-1 align-items-center Container-Additional-Selector">
                                    {secondSelectAdditionalVisible && (
                                        <select style={visibleSecondStep} className="ms-1 form-select" id="Select-TypeAdditional" value={secondAdditionalValue} onChange={selectSecondTypeAdditional}>
                                            <option value="">Adicional</option>
                                            <option value="Leite Condensado">Leite Condensado</option>
                                            <option value="Yakut">Yakut</option>

                                        </select>
                                    )}
                                    {!secondSelectAdditionalVisible ? (

                                        <button className="btn btn-light" onClick={() => { setSecondSelectAdditionalVisible(!secondSelectAdditionalVisible) }} >+</button>

                                    ) : (<button className="btn btn-danger" onClick={() => { setSecondSelectAdditionalVisible(!secondSelectAdditionalVisible); setSecondAdditionalValue(undefined); setBackgroundSecondAdditionalColor("") }}>x</button>)}
                                </div>


                            </div>


                            <div style={visibleThirdStep} className="mt-3 mb-3 Container-Purchase-Value">

                                <img src={Número3Img} alt=""></img>
                                <div className="Informative-Texts">
                                    <p>Confira o valor</p>
                                </div>
                                <h2>Valor Total: {formattedPrice}</h2>


                            </div>
                            <div style={visibleThirdStep} className="Informative-Div-inverse">
                                <img src={Número4Img} alt=""></img>
                                <div className="Informative-Texts">
                                    <p>Agora é só finalizar a compra</p>
                                </div>
                            </div>
                            <div style={visibleThirdStep} className="mt-1 Container-Submit">
                                <button type="submit" className="mt-3 btn btn-light mb-4" onClick={handleCreateItemCart}>Adicionar ao Carrinho</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div >

        </>

    )

}


export default ClientView;