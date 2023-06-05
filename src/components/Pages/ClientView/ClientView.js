import LoadingScreen from "../../Loading/LoadingScreen"
import imgLogoCaipirinha from "../../../imagens/Logo-Caipirinha-Preto-Meia.png"
import { useState } from "react";

import pineappleImg from "../../../imagens/fruits/abacaxiP.png"
import lemonImg from "../../../imagens/fruits/limaoP.png"
import stranwberryImg from "../../../imagens/fruits/morangoP.png"
import passionImg from "../../../imagens/fruits/maracujaP.png"
import Número1Img from "../../../imagens/numeros/Número1Img.png"
import Número2Img from "../../../imagens/numeros/Número2Img.png"
import Número3Img from "../../../imagens/numeros/Número3Img.png"
import Número4Img from "../../../imagens/numeros/Número4Img.png"

import './ClientView.css'

let fruitEvent;
let drinkEvent;
let additionalEvent;

let formattedPrice;

let numberId = 0;

function ClientView() {

    const [allItems, setAllItems] = useState([])
    const [stockValue, setStockValue] = useState("")

    const [drinkAnimReplay, setDrinkAnimReplay] = useState("toFill")
    const [additionalAnimReplay, setAdditionalAnimReplay] = useState("toFill")

    const [isVisibleShoppingCart, setvisibleShoppingCart] = useState(false)
    const [animSecondStep, setAnimSecondStep] = useState("")
    const [animThirdStep, setAnimThirdStep] = useState("")

    const [typeDrinkValue, setTypeDrinkValue] = useState("")
    const [fruitValue, setFruitValue] = useState("")
    const [additionalValue, setAdditionalValue] = useState("")
    const [backgroundDrinkColor, setBackgroundDrinkColor] = useState("")
    const [backgroundAdditionalColor, setBackgroundAdditionalColor] = useState("")
    const [fruitImg, setFruitImg] = useState("")

    const [totalOrderAmont, setTotalOrderAmont] = useState(11)

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
            case "Wine":
                setBackgroundDrinkColor('#5e2129ee')
                break
            case "Liquor":
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

    const selectTypeFruit = (event) => {
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
            case "Limao":
                // Defina a imagem de fundo para a opção "Limao"
                setFruitImg(lemonImg);
                break;
            case "Maracuja":
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

    const selectAdditionalType = (event) => {
        setAdditionalValue(event.target.value)

        switch (event.target.value) {
            case "LeiteCondensado":
                setBackgroundAdditionalColor("#f0e6bbbf")
                break;
            case "Yakut":
                setBackgroundAdditionalColor("#ffffffa1")
                break;

            default:
                setBackgroundAdditionalColor("")
                break;
        }

        //replay da animação
        if (additionalAnimReplay === "toFill") {
            setAdditionalAnimReplay("secondToFill")
        }
        else if (additionalAnimReplay === "secondToFill") {
            setAdditionalAnimReplay("toFill")
        }

        additionalEvent = event.target.value
        selectedSelectors();

    }

    //faz surgir o segundo passo de escolha do pedido
    function selectedSelectors() {

        if (drinkEvent === undefined || fruitEvent === undefined || drinkEvent === "" || fruitEvent === "") {
            setAnimSecondStep("")

        } else {
            setAnimSecondStep("isVisibleOrNot")

        }

        if (additionalEvent === undefined || additionalEvent === "") {
            setAnimThirdStep("")
            setTotalOrderAmont(11)

        } else if (additionalEvent === "None") {

            setTotalOrderAmont(11)

        } else {
            setAnimThirdStep("isVisibleOrNot")
            setTotalOrderAmont(13)
        }
    }

    //Formata o preço do produto para o padrão BR
    formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalOrderAmont)

    //Style para mudar a cor do fundo do copo
    const glassStyle = {
        color: backgroundDrinkColor,
        backgroundImage: `url(${fruitImg})`,
        animationName: drinkAnimReplay
    }
    //Style para mudar a cor do addicional no fundo do copo
    const additionalStyle = {
        color: backgroundAdditionalColor,
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

    //Envia o item para o carrinho
    const handleCreateItemCart = () => {

        const item = {
            id: numberId,
            drinkName: typeDrinkValue,
            fruitName: fruitValue,
            additionalName: additionalValue,
            productPrice: formattedPrice

        };

        setAllItems([...allItems, item]);
        setStockValue(stockValue - item.price);

        numberId = numberId + 1;

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
                    <div className="z-1 container-sm position-absolute top-50 start-50 translate-middle Container-Shopping-Cart">
                        <div className="position-relative Items-Cart"><p>Itens:</p>
                            {allItems.map(item => (
                                <div className="z-2 Item" key={item.id}>
                                    <div>
                                        <li><p className="Number">{item.id}</p></li>
                                        <div className="Inverse-Product">
                                            <li><p className="Drink-Name">Caipirinha de {item.drinkName}</p></li>
                                            <li><p className="Fruit-Name">- {item.fruitName}</p></li>
                                            <li><p className="Additional-Name">- {item.additionalName}</p></li>
                                            <li><p className="Product-Price">Valor: {item.productPrice}</p></li>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="row m-auto Container-Items-And-Opcoes">
                    <div className="col Container-Item">

                        <div style={glassStyle} className="mb-5 z-n1 Glass-Item">
                            <div style={additionalStyle} className="z-1 Glass-Additional">
                                <div className="z-1 Glass-Background-Color">

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
                                <option value="Wine">Vinho</option>
                                <option value="Liquor">Cachaça</option>
                            </select>
                            <select className="form-select mt-2" id="Select-TypeFruit" value={fruitValue} onChange={selectTypeFruit}>
                                <option value="">Fruta</option>
                                <option value="Morango">Morango</option>
                                <option value="Abacaxi">Abacaxi</option>
                                <option value="Limao">Limão</option>
                                <option value="Maracuja">Maracujá</option>
                                <option value="Coco">Coco</option>
                            </select>

                            <div style={visibleSecondStep} className="Informative-Div-inverse">
                                <img src={Número2Img} alt=""></img>
                                <div className="Informative-Texts">
                                    <p>Escolha seu adicional</p>
                                </div>
                                <select style={visibleSecondStep} className="form-select mt-2" id="Select-TypeAdditional" value={additionalValue} onChange={selectAdditionalType}>
                                    <option value="">Adicional</option>
                                    <option value="LeiteCondensado">Leite Condensado</option>
                                    <option value="Yakut">Yakut</option>
                                    <option value="None">Nenhum</option>
                                </select>
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
            </div>
        </>
    )
}

export default ClientView