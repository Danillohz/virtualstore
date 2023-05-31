import LoadingScreen from "./LoadingScreen"
import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"
import { useState } from "react";

import pineappleImg from "../imagens/fruits/abacaxiP.png"
import lemonImg from "../imagens/fruits/limaoP.png"
import stranwberryImg from "../imagens/fruits/morangoP.png"
import passionImg from "../imagens/fruits/maracujaP.png"


function ClientView() {


    const [animationReplay, setAnimationReplay] = useState("toFill")

    const [isVisibleShoppingCart, setvisibleShoppingCart] = useState(false)
    const [typeDrinkValue, setTypeDrinkValue] = useState("")
    const [fruitValue, setFruitValue] = useState("")
    const [additionalValue, setAdditionalValue] = useState("")
    const [backgroundDrinkColor, setBackgroundDrinkColor] = useState("")
    const [backgroundAdditionalColor, setBackgroundAdditionalColor] = useState("")
    const [fruitImg, setFruitImg] = useState("")

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

        //reseta a animação do drink enxendo
        if (animationReplay === "toFill") {
            setAnimationReplay("secondToFill")
        }
        else if (animationReplay === "secondToFill") {
            setAnimationReplay("toFill")
        }

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
    }

    const selectAdditionalType = (event) => {
        setAdditionalValue(event.target.value)

        //reseta a animação do drink enxendo
        if (animationReplay === "toFill") {
            setAnimationReplay("secondToFill")
        }
        else if (animationReplay === "secondToFill") {
            setAnimationReplay("toFill")
        }

        switch (event.target.value) {
            case "LeiteCondensado":
                setBackgroundAdditionalColor("#f0e6bbbf")
                break;
            case "Yakut":
                setBackgroundAdditionalColor("#dfdfdfa1")
                break;

            default:
                setBackgroundAdditionalColor("")
                break;
        }

    }

    //Style para mudar a cor do fundo do copo
    const glassStyle = {
        color: backgroundDrinkColor,
        backgroundImage: `url(${fruitImg})`,
        animationName: animationReplay
    }
    //Style para mudar a cor do addicional no fundo do copo
    const additionalStyle = {
        color: backgroundAdditionalColor,
        animationName: animationReplay
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
                    <div className="container-sm position-absolute top-50 start-50 translate-middle Container-Shopping-Cart">
                        <div className="position-relative Items-Cart">Itens:</div>
                    </div>
                )}
                <div className="row m-auto Container-Items-And-Opcoes">
                    <div className="col Container-Item">

                        <div style={glassStyle} className={`z-n1 Glass-Item`}>
                            <div style={additionalStyle} className="z-1 Glass-Additional">
                                <div className="z-1 Glass-Background-Color">

                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="col Container-Opcoes-Item">
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
                        <select className="form-select mt-2" id="Select-TypeAdditional" value={additionalValue} onChange={selectAdditionalType}>
                            <option value="">Adicional</option>
                            <option value="LeiteCondensado">Leite Condensado</option>
                            <option value="Yakut">Yakut</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientView