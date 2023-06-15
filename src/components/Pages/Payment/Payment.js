import { useCallback, useEffect, useState } from 'react';
import './Payment.css'

import cardChip from "../../../imagens/chip.png"

import imgInte from "../../../imagens/interrogação.png"
import imgVazia from "../../../imagens/Fundo-transparente.png"
import nubankLogo from "../../../imagens/bancos/nubanklogo.png"
import bdbLogo from "../../../imagens/bancos/bdbLogo.png"
import bradescoLogo from "../../../imagens/bancos/bradescoLogo.png"
import interLogo from "../../../imagens/bancos/interLogo.png"
import itauLogo from "../../../imagens/bancos/itauLogo.png"
import sanatanderLogo from "../../../imagens/bancos/santanderLogo.png"
import panLogo from "../../../imagens/bancos/panLogo.png"

import mastercardLogo from "../../../imagens/bancos/Bandeiras/mastercardLogo.png"
import eloLogo from "../../../imagens/bancos/Bandeiras/eloLogo.png"
import visaLogo from "../../../imagens/bancos/Bandeiras/visaLogo.png"


let numberId = 1;
let MMAA;

let cardIsVisible
let firstCardName = "Card"

const Payment = () => {

    const [allItems, setAllItems] = useState([]);
    const [stockValue, setStockValue] = useState("");

    const [cardNumberValue, setCardNumberValue] = useState("");
    const [cardValidityMMValue, setCardValidityMMValue] = useState("");
    const [cardValidityAAValue, setCardValidityAAValue] = useState("");
    const [cvvCardValue, setCvvCardValue] = useState("");
    const [cardNameValue, setCardNameValue] = useState("");
    const [flagCardValue, setFlagCardValue] = useState("");
    const [bankCardValue, setBankCardValue] = useState("");
    const [colorCardValue, setColorCardValue] = useState("#4c0677")

    const [imgBankLogo, setImgBankLogo] = useState(imgVazia);
    const [imgFlagLogo, setimgFlagLogo] = useState(imgVazia);

    const [deliveryIsVisible, setDeliveryIsVisible] = useState(true);
    const [locationIsVisible, setLocationIsVisible] = useState(false);
    const [paymentIsVisible, setPaymentIsVisible] = useState(false);
    const [cardSideIsVisible, setCardSideIsVisible] = useState(true);
    const [walletIsVisible, setWalletIsVisible] = useState(false);

    const [createCardIsVisible, setCreateCardIsVisible] = useState(false)

    const [checkedCard, setCheckedCard] = useState(undefined)
    const [checkedMoney, setCheckedMoney] = useState(undefined)

    const [cep, setCep] = useState("");
    const [cepValidation, setCepValidation] = useState(false);
    const [cityName, setCityName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [streetName, setStreetName] = useState("");

    const handleCep = (event) => {
        const cepValue = event.target.value.replace(/\D/g, '')
        setCep(cepValue)
    }

    const handleCityName = (event) => {
        setCityName(event.target.value)
    }
    const handleDistrictName = (event) => {
        setDistrictName(event.target.value)
    }
    const handleStreetName = (event) => {
        setStreetName(event.target.value)
    }

    const handleCard = () => {
        setCheckedCard(true)
        setCheckedMoney(false)

    }
    const handleMoney = () => {
        setCheckedMoney(true)
        setCheckedCard(false)

    }

    const searchAddress = useCallback(async () => {

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
            setCityName(data.localidade || '');
            setDistrictName(data.bairro || '');
            setStreetName(data.logradouro || '')
            setCepValidation(true);

        } else {
            setCepValidation(false);
            window.alert("CEP inválido");
            setCityName("");
            setDistrictName("");
            setStreetName("");
        }
    }, [cep]);

    //Busca o endereço quando o cep atingir 8 números
    useEffect(() => {
        if (cep.length === 8) {

            searchAddress();
        }
    }, [cep, searchAddress]);

    const clickForProceed = () => {
        if (cepValidation === true) {

            setLocationIsVisible(false);
            setPaymentIsVisible(true);

        } else {
            window.alert("Cep inválido")
        }
    }

    //altera os valores dos input relacionados ao cartão

    const handleColorCard = (event) =>{
        setColorCardValue(event.target.value)
    }
    const handleCardNumber = (event) => {
        setCardNumberValue(event.target.value)
    }
    const handleValidityMMValue = (event) => {
        setCardValidityMMValue(event.target.value)
    }
    const handleValidityAAValue = (event) => {
        setCardValidityAAValue(event.target.value)
    }
    const handleCvvValue = (event) => {
        setCvvCardValue(event.target.value)
    }
    const handleCardName = (event) => {
        setCardNameValue(event.target.value)
    }
    const handleFlagValue = (event) => {
        setFlagCardValue(event.target.value)

        //Muda a bandeira do cartão
        switch (event.target.value) {
            case "Mastercard":
                setimgFlagLogo(mastercardLogo)
                break
            case "Visa":
                setimgFlagLogo(visaLogo)
                break
            case "Elo":
                setimgFlagLogo(eloLogo)
                break
            case "Outra":
                setimgFlagLogo(imgInte)
                break
            default:
                setimgFlagLogo(imgVazia)
                break
        }
    }
    const handleBankValue = (event) => {
        setBankCardValue(event.target.value)

        //Muda a logo de banco do cartão
        switch (event.target.value) {

            case "PAN":
                setImgBankLogo(panLogo)

                break
            case "Inter":
                setImgBankLogo(interLogo)

                break
            case "Nubank":
                setImgBankLogo(nubankLogo)

                break
            case "Santander":
                setImgBankLogo(sanatanderLogo)

                break
            case "Banco do Brasil":
                setImgBankLogo(bdbLogo)

                break
            case "Bradesco":
                setImgBankLogo(bradescoLogo)

                break
            case "Itau":
                setImgBankLogo(itauLogo)

                break
            case "Outro":
                setImgBankLogo(imgInte)

                break

            default:
                setimgFlagLogo(imgVazia)
                break
        }


    }
    //arruma a validade
    const validateMMAA = () => {
        MMAA = cardValidityMMValue + "/" + cardValidityAAValue
    }

    //Cria um novo cartão
    const handleCreateCard = () => {

        if (cardNumberValue !== "" && cardValidityAAValue !== "" && cardValidityMMValue !== "" && cvvCardValue !== "" && cardNameValue !== "") {
            if (allItems.length < 4) {
                validateMMAA()

                const item = {
                    id: numberId,
                    cardNumber: cardNumberValue,
                    cardValidity: MMAA,
                    cvvCard: cvvCardValue,
                    cardName: cardNameValue,
                    flagCard: imgFlagLogo,
                    bankCard: imgBankLogo,
                    className: firstCardName,
                    colorCard: colorCardValue

                };

                setAllItems([...allItems, item]);
                setStockValue(stockValue - item.price);

                numberId = numberId + 1
                firstCardName = "d-none Card"

                setCardNumberValue("")
                setCardValidityMMValue("")
                setCardValidityAAValue("")
                setCardNameValue("")
                setFlagCardValue("")
                setBankCardValue("")
                setCreateCardIsVisible(false)
            }
            else {

                window.alert("Número de cartões Excedido")
            }
        }
        else {
            window.alert("Dados não preenchidos")
        }
    }
    //deleta o item que está aparecendo
    const handleDeleteItem = () => {
        const itemsToKeep = allItems.filter(item => item.className === "d-none Card");
        setAllItems(itemsToKeep)
    }
    //Muda o cartão escolhido
    const changeFirstCard = () => {
        cardIsVisible = 0;
        changeCardVisible();

    }
    const changeSecondCard = () => {
        cardIsVisible = 1;
        changeCardVisible();

    }
    const changeThirdCard = () => {
        cardIsVisible = 2
        changeCardVisible();

    }
    const changeFourthCard = () => {
        cardIsVisible = 3
        changeCardVisible();

    }

    const changeCardVisible = () => {

        const updatedItems = allItems.map((item, index) => {
            if (index === cardIsVisible) {
                return { ...item, className: 'Card' }; // Substitua 'new-class-1' pelo valor desejado para o primeiro item
            } else {
                return { ...item, className: 'd-none Card' }; // Substitua 'new-class-2' pelo valor desejado para os demais itens
            }
        });
        setAllItems(updatedItems);
        setWalletIsVisible(false);

    }

    return (
        <>
            <main>
                <div className="position-absolute top-50 start-50 translate-middle Container-Center">

                    {deliveryIsVisible && (
                        <div className=" Delivery-Or-Withdrawal">
                            <div className="row m-auto Delivery-Or-Withdrawal-Btns">
                                <h2 className="m-auto">Entrega ou Retirada?</h2>
                                <div className="col Delivery-Btn">
                                    <button className="btn btn-light" type="button" onClick={() => { setDeliveryIsVisible(false); setLocationIsVisible(true) }}></button>
                                </div>

                                <div className="col Withdrawal-Btn">
                                    <button className="btn btn-light" type="button" onClick={() => { setDeliveryIsVisible(false); setPaymentIsVisible(true) }}></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {locationIsVisible && (
                        <>
                            <form className="row Location-Form">
                                <div className="col-6">
                                    <label htmlFor="CepIdInput">CEP:</label>
                                    <input type="text" className="form-control" id="CepIdInput" placeholder="84165190 Ex" size={10} maxLength={8} onChange={handleCep}></input>
                                </div>
                                <div></div>
                                <div className="col">
                                    <label htmlFor="CityIdInput">Cidade:</label>
                                    <input type="text" className="form-control" id="CityIdInput" placeholder="Vittorio Ex" value={cityName} onChange={handleCityName}></input>

                                </div>
                                <div className="col">
                                    <label htmlFor="DistrictIdInput">Bairro:</label>
                                    <input type="tex" className="form-control" id="DistrictIdInput" placeholder="Centro Ex" value={districtName} onChange={handleDistrictName}></input>

                                </div>
                                <div></div>
                                <div className="col">
                                    <label htmlFor="StreetIdInput">Rua:</label>
                                    <input type="tex" className="form-control" id="StreetIdInput" placeholder="Leopoldina Da Vera Cruz Ex" value={streetName} onChange={handleStreetName}></input>
                                </div>
                                <div></div>
                                <div className="col-4">
                                    <label htmlFor="NumberIdInput">Número:</label>
                                    <input type="number" className="form-control" id="NumberIdInput" placeholder="0 Ex"></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="ComplementoIdInput">Complemento:</label>
                                    <input type="text" className="form-control" id="ComplementoIdInput" placeholder="Em frente a uma padaria Ex"></input>
                                </div>

                            </form>

                            <div className="Proceed-Btn">
                                <button className="m-3 btn btn-light" type="button" onClick={clickForProceed}>Prosseguir</button>
                            </div>

                        </>
                    )}

                    {paymentIsVisible && (
                        <>
                            <form className="m-2 Payment-Form ">
                                <h3>Forma de pagamento</h3>


                                <div className="d-flex">
                                    <div className="me-2 Card-Or-Money">
                                        <div className="">
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onChange={handleCard} value={checkedCard}></input>
                                            <label className="btn btn-outline-secondary" htmlFor="btnradio1"><span className="material-symbols-outlined">
                                                credit_card
                                            </span></label>
                                        </div>
                                        <div className="mt-1">
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onChange={handleMoney} value={checkedMoney}></input>
                                            <label className="btn btn btn-outline-secondary" htmlFor="btnradio2"><span className="material-symbols-outlined">
                                                payments
                                            </span></label>
                                        </div>
                                    </div>
                                    <div className="Container-Card-Or-Money">
                                        {checkedMoney && (
                                            <>
                                                <div className="ms-2">
                                                    <div className=" p-2 Container-Money-Change">
                                                        <p className="m-0">Troco para quanto?</p>
                                                        <input type="number" className="form-control form-control-sm"></input>
                                                    </div>
                                                </div>


                                            </>)}
                                        {checkedCard && (
                                            <>
                                                <div>
                                                    <div className="row m-auto Container-Card">
                                                        <div className="col-sm-10">
                                                            <div className="Card-Container">

                                                                {walletIsVisible && (
                                                                    <div className="z-0 Container-Wallet">
                                                                        <div className="row m-auto Card-Slots">
                                                                            {allItems.length > 0 && (
                                                                                <button className="col btn btn-light Card-Slot" type="button" onClick={changeFirstCard}>

                                                                                    <p className="m-auto">1</p>
                                                                                </button>
                                                                            )}
                                                                            {allItems.length > 1 && (
                                                                                <button className="col btn btn-light Card-Slot" type="button" onClick={changeSecondCard}>

                                                                                    <p className="m-auto">2</p>
                                                                                </button>
                                                                            )}
                                                                            {allItems.length > 2 && (
                                                                                <button className="col btn btn-light Card-Slot" type="button" onClick={changeThirdCard}>

                                                                                    <p className="m-auto">3</p>
                                                                                </button>
                                                                            )}
                                                                            {allItems.length > 3 && (
                                                                                <button className="col btn btn-light Card-Slot" type="button" onClick={changeFourthCard}>

                                                                                    <p className="m-auto">4</p>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {allItems.map((item) => (
                                                                    <div key={item.id} >


                                                                        <div>
                                                                            <div className={`Card ${item.className}`}>
                                                                                {cardSideIsVisible && (
                                                                                    <div className="Card-Front" style={{backgroundColor: item.colorCard}}>
                                                                                        <img className="Card-Chip" src={cardChip} alt=""></img>
                                                                                        <img className="Card-Flag" src={item.flagCard} alt="flag"></img>
                                                                                        <div className="Card-Name">
                                                                                            <p>{item.cardName}</p>
                                                                                        </div>
                                                                                        <img className="Card-Bank" src={item.bankCard} alt="bank"></img>
                                                                                    </div>
                                                                                )}
                                                                                {!cardSideIsVisible && (
                                                                                    <div className="Back-Card" style={{backgroundColor: item.colorCard}}>
                                                                                        <div className="Black-Line"></div>
                                                                                        <div className="ms-1">
                                                                                            <p className="m-2">{item.cardNumber}</p>
                                                                                            <div className="row Data-Inverse">
                                                                                                <div className="col-5">
                                                                                                    <p className="m-auto Data-Titles">validade</p>
                                                                                                    <p className="Data m-auto">{item.cardValidity}</p>
                                                                                                </div>
                                                                                                <div className="col">
                                                                                                    <p className="m-auto Data-Titles">cvv</p>
                                                                                                    <p className="Data m-auto">{item.cvvCard}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-1">

                                                            <div className="Card-Buttons mt-1 z-1">

                                                                <button className="btn btn-light" type="button" onClick={() => { setCreateCardIsVisible(!createCardIsVisible) }}><span className="material-symbols-outlined">
                                                                    add_card
                                                                </span></button>

                                                                <button className="btn btn-light" type="button" onClick={handleDeleteItem}><span className="material-symbols-outlined">
                                                                    credit_card_off
                                                                </span></button>

                                                                <button className="btn btn-light" type="button" onClick={() => { setCardSideIsVisible(!cardSideIsVisible) }}><span className="material-symbols-outlined">
                                                                    reopen_window
                                                                </span></button>

                                                                <button className="btn btn-light" type="button" onClick={() => { setWalletIsVisible(!walletIsVisible) }}><span className="material-symbols-outlined">
                                                                    cards
                                                                </span></button>

                                                            </div>
                                                        </div>


                                                        {/* Add Card  */}
                                                        {createCardIsVisible && (
                                                            <div className="row m-auto position-absolute top-50 start-50 translate-middle Create-Card">

                                                                <div className="Exit-btn">
                                                                    <button className="btn btn-danger" type="button" onClick={() => { setCreateCardIsVisible(false) }}>X</button>
                                                                </div>

                                                                <div className="">
                                                                    <label htmlFor="Number-Card-Id">Número do cartão</label>
                                                                    <input type="Number" className="form-control" id="Number-Card-Id" value={cardNumberValue} onChange={handleCardNumber}></input>
                                                                </div>


                                                                <div className="col mt-2">
                                                                    <label className="" htmlFor="Validity-Id">Validade</label>
                                                                    <div className=" d-flex Small-Inputs-Card">
                                                                        <input type="number" className="form-control" id="Validity-Id" placeholder="MM" min={1} max={12} value={cardValidityMMValue} onChange={handleValidityMMValue}></input>


                                                                        <input type="number" className="ms-2 form-control" id="Validity-Id" placeholder="AA" min={20} max={90} value={cardValidityAAValue} onChange={handleValidityAAValue}></input>
                                                                    </div>
                                                                </div>


                                                                <div className="col mt-2 Small-Inputs-Card">
                                                                    <label htmlFor="Cvv-Id">CVV</label>
                                                                    <input type="number" className="form-control" id="Cvv-Id" placeholder="xxx" value={cvvCardValue} onChange={handleCvvValue}></input>
                                                                </div>
                                                                <div className="col-12 mt-2">
                                                                    <label htmlFor="Name-Id">Nome do cartão</label>
                                                                    <input type="text" className="form-control" id="Name-Id" placeholder="" value={cardNameValue} onChange={handleCardName}></input>
                                                                </div>
                                                                <div className="col mt-2">
                                                                    <label htmlFor="Flag-Id">Bandeira</label>
                                                                    <select className="form-select Select-Flag" id="Flag-Id" value={flagCardValue} onChange={handleFlagValue}>
                                                                        <option value="">Opcional</option>
                                                                        <option value="Mastercard">Mastercard</option>
                                                                        <option value="Visa">Visa</option>
                                                                        <option value="Elo">Elo</option>
                                                                        <option value="Outra">Outra</option>

                                                                    </select>
                                                                </div>
                                                                <div className="col mt-2">
                                                                    <label htmlFor="Bank-Id">Banco</label>
                                                                    <select className="form-select Select-Bank" id="Bank-Id" value={bankCardValue} onChange={handleBankValue}>
                                                                        <option value="">Opcional</option>
                                                                        <option value="PAN">PAN</option>
                                                                        <option value="Inter">Inter</option>
                                                                        <option value="Nubank">Nubank</option>
                                                                        <option value="Santander">Santander</option>
                                                                        <option value="Banco do Brasil">Banco do Brasil</option>
                                                                        <option value="Bradesco">Bradesco</option>
                                                                        <option value="Itau">Itaú </option>
                                                                        <option value="Outro">Outro</option>
                                                                    </select>
                                                                </div>
                                                                <div></div>
                                                                <div className="col mt-2 Color-Card-Input">
                                                                    <label htmlFor="Color-Card-Id">Cor do cartão</label>
                                                                    <input type="color" className="form-control Color-Card" id="Color-Card-Id" value={colorCardValue} onChange={handleColorCard}></input>
                                                                </div>
                                                                <div className='col'>
                                                                    <button className='btn btn-light mt-4' type="button" onClick={handleCreateCard} >Adicionar</button>
                                                                </div>


                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>

                                </div>
                                <div className="Checkout">
                                    <button className="mt-2 me-3 btn btn-light" type="submit">Finalizar compra</button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </main >
        </>
    )
}
export default Payment;