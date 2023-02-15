export const Modal = ({ modalFunction, message, closeFunction }) => {

    return (
        <section className="modal">
            <div className="modalUser">
                <p>{message}</p>
                <img src="https://media.tenor.com/erjWKt2RLw4AAAAM/jim-carrey-dumb-and-dumber.gif" alt="gifModal" />
                <div className='buttons'>
                    <button className="agreeBtn" onClick={modalFunction}>Aceptar</button>
                    <button className="cancelBtn" onClick={closeFunction}>Cancelar</button>
                </div>
            </div>
        </section>
    )
}