import LoadingScreen from "./LoadingScreen"

import imgLogoCaipirinha from "../imagens/Logo-Caipirinha-Preto-Meia.png"
import { useState } from "react";

function ClientView() {

    const [isVisibleShoppingCart, setvisibleShoppingCart] = useState(false)

    const toggleVisibleShoppingCart = () => {
        setvisibleShoppingCart(!isVisibleShoppingCart)
    }

    return (
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

            <LoadingScreen value={1000 * 3}></LoadingScreen>
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
                <div className="container-sm position-absolute top-50 start-50 translate-middle Container-Carrinho-De-Compras">
                    <div className="position-relative Itens">Itens:</div>
                </div>
            )}
        </>
    )
}

export default ClientView