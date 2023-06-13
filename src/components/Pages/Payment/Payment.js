import { useCallback, useEffect, useState } from 'react';
import './Payment.css'

import nubankLogo from "../../../imagens/bancos/nubanklogo.png"
import bdbLogo from "../../../imagens/bancos/bdbLogo.png"
import bradescoLogo from "../../../imagens/bancos/bradescoLogo.png"
import interLogo from "../../../imagens/bancos/interLogo.png"
import itauLogo from "../../../imagens/bancos/itauLogo.png"
import sanatanderLogo from "../../../imagens/bancos/santanderLogo.png"
import panLogo from "../../../imagens/bancos/panLogo.png"

import mastercardLogo from "../../../imagens/bancos/Bandeiras/mastercardLogo.png"

let numberId = 0;

const Payment = () => {

    const [allItems, setAllItems] = useState([]);
    const [stockValue, setStockValue] = useState("");

    const [cardNumberValue, setCardNumberValue] = useState("");
    const [cardValidityValue, setCardValidityValue] = useState("");
    const [cvvCardValue, setCvvCardValue] = useState("");
    const [cardNameValue, setCardNameValue] = useState("");
    const [flagCardValue, setFlagCardValue] = useState("");
    const [bankCardValue, setBankCardValue] = useState("");

    const [imgBankLogo, setImgBankLogo] = useState("");
    const [imgFlagLogo, setimgFlagLogo] = useState("");

    const [deliveryIsVisible, setDeliveryIsVisible] = useState(true);
    const [locationIsVisible, setLocationIsVisible] = useState(false);
    const [paymentIsVisible, setPaymentIsVisible] = useState(false);

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

    const handleCardNumber = (event) => {
        setCardNumberValue(event.target.value)
    }
    const handleValidityValue = (event) => {
        setCardValidityValue(event.target.value)
    }
    const handleCvvValue = (event) => {
        setCvvCardValue(event.target.value)
    }
    const handleCardName = (event) => {
        setCardNameValue(event.target.value)
    }
    const handleFlagValue = (event) => {
        setFlagCardValue(event.target.value)
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
                setImgBankLogo(nubankLogo)

                break

            default:
                break
        }


    }

    //Cria um novo cartão
    const handleCreateCard = () => {


        console.log(imgBankLogo)

        const item = {
            id: numberId,
            cardNumber: cardNumberValue,
            cardValidity: cardValidityValue,
            cvvCard: cvvCardValue,
            cardName: cardNameValue,
            flagCard: flagCardValue,
            bankCard: imgBankLogo,

        };
        console.log(imgBankLogo)
        setAllItems([...allItems, item]);
        setStockValue(stockValue - item.price);

        numberId = numberId + 1
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
                                    <button className="btn btn-light" onClick={() => { setDeliveryIsVisible(false); setLocationIsVisible(true) }}></button>
                                </div>

                                <div className="col Withdrawal-Btn">
                                    <button className="btn btn-light" onClick={() => { setDeliveryIsVisible(false); setPaymentIsVisible(true) }}></button>
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
                                <button className="m-3 btn btn-light" onClick={clickForProceed}>Prosseguir</button>
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
                                                                {allItems.map(item => (
                                                                    <div key={item.id}>
                                                                        <div className="Card">
                                                                            <div className="d-flex">
                                                                                <div className="Card-Chip"></div>
                                                                                <div className="Card-Flag"><img src={mastercardLogo} alt="flag"></img></div>
                                                                            </div>
                                                                            <div className="Card-Name"><p className="m-auto">{item.cardName}</p></div>
                                                                            <div className="Card-Bank"><img src={item.bankCard} alt="bank"></img></div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-1">
                                                            <div className="Add-And-Delete-Card-Btn">
                                                                <button className="btn btn-light me-2 mt-1 mb-1" onClick={() => { setCreateCardIsVisible(!createCardIsVisible) }}><span className="material-symbols-outlined">
                                                                    add_card
                                                                </span></button>
                                                                <button className="btn btn-light m-auto"><span className="material-symbols-outlined">
                                                                    credit_card_off
                                                                </span></button>

                                                            </div>
                                                        </div>

                                                        {createCardIsVisible && (
                                                            <div className="row m-auto position-absolute top-50 start-50 translate-middle Create-Card">

                                                                <div className="Exit-btn">
                                                                    <button className="btn btn-danger" onClick={() => { setCreateCardIsVisible(false) }}>X</button>
                                                                </div>

                                                                <div className="">
                                                                    <label htmlFor="Number-Card-Id">Número do cartão</label>
                                                                    <input type="Number" className="form-control" id="Number-Card-Id" value={cardNumberValue} onChange={handleCardNumber}></input>
                                                                </div>


                                                                <div className="col mt-2">
                                                                    <label className="" htmlFor="Validity-Id">Validade</label>
                                                                    <div className=" d-flex Small-Inputs-Card">
                                                                        <input type="number" className="form-control" id="Validity-Id" placeholder="MM" min={1} value={cardValidityValue} onChange={handleValidityValue}></input>


                                                                        <input type="number" className="ms-2 form-control" id="Validity-Id" placeholder="AA" min={20}></input>
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
                                                                <div>
                                                                    <button className='btn btn-light mt-2' onClick={handleCreateCard} >Adicionar</button>
                                                                </div>


                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </main>
        </>
    )
}
export default Payment;