import { useState } from 'react';
import './Payment.css'

const Payment = () => {

    const [deliveryIsVisible, setDeliveryIsVisible] = useState(true);
    const [locationIsVisible, setLocationIsVisible] = useState(false);
    const [paymentIsVisible, setPaymentIsVisible] = useState(false);

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
                                    <input type="number" className="form-control" id="CepIdInput" placeholder="84165190"></input>
                                </div>
                                <div></div>
                                <div className="col">
                                    <label htmlFor="CityIdInput">Cidade:</label>
                                    <input type="text" className="form-control" id="CityIdInput" placeholder="Vittorio Ex"></input>

                                </div>
                                <div className="col">
                                    <label htmlFor="BairroIdInput">Bairro:</label>
                                    <input type="tex" className="form-control" id="BairroIdInput" placeholder="Centro Ex"></input>

                                </div>
                                <div></div>
                                <div className="col">
                                    <label htmlFor="RuaIdInput">Rua:</label>
                                    <input type="tex" className="form-control" id="RuaIdInput" placeholder="Leopoldina Da Vera Cruz Ex"></input>
                                </div>
                                <div></div>
                                <div className="col-4">
                                    <label htmlFor="NumberIdInput">Número:</label>
                                    <input type="number" className="form-control" id="NumberIdInput" placeholder="654"></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="ComplementoIdInput">Complemento:</label>
                                    <input type="text" className="form-control" id="ComplementoIdInput" placeholder="Em frente a uma padaria Ex"></input>
                                </div>

                            </form>

                            <div className="Proceed-Btn">
                                <button className="m-3 btn btn-light" onClick={() => { setLocationIsVisible(false); setPaymentIsVisible(true) }}>Prosseguir</button>
                            </div>

                        </>
                    )}

                    {paymentIsVisible && (
                        <>
                            <form className="Payment-Form">

                            </form>
                        </>
                    )}

                </div>
            </main>
        </>
    )
}
export default Payment;