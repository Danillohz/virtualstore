import { useCallback, useEffect, useState } from 'react';
import './Payment.css'

const Payment = () => {

    const [deliveryIsVisible, setDeliveryIsVisible] = useState(true);
    const [locationIsVisible, setLocationIsVisible] = useState(false);
    const [paymentIsVisible, setPaymentIsVisible] = useState(false);

    const [cep, setCep] = useState("");
    const [cepValidation, setCepValidation] = useState(false);
    const [cityName, setCityName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [streetName, setStreetName] = useState("")

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
                            <form className="Payment-Form">
                                ""
                            </form>
                        </>
                    )}

                </div>
            </main>
        </>
    )
}
export default Payment;