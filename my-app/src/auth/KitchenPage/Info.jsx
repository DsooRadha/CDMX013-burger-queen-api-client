export const Info = ({ item}) => {

    return (

        <div className="orderTime">
            <p>{item.time}</p>
            <section className='allTimes'>
            <p>Llegó: {item.hour}</p>
            <p>Finalizó: {item.done}</p>
            </section>
        </div>

    )
}