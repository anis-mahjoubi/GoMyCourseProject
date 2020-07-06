import React from 'react'

const ColoredCard = ({coloredCardData}) =>{
    return <section className="colored-grid-container">
        {coloredCardData.map((el,i) =>
            <div  key={i} className="colored-grid patients" style={{backgroundColor: el.color}}>
                <h2>{el.destination}</h2>
                <h1>{el.title}</h1>
                <img src={require(el.imgSrc + "")} className="colored-grid-img" style={(i !== 0 ? { marginLeft: "-70%" } : { marginRight: "-70%" })} /> 
            </div>
            )}
    
    </section>
}

export default ColoredCard