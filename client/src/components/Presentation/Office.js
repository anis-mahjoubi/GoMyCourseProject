import React from 'react'

const Office = ({officeData}) => {
    return <section className="office-container">
        <div className="offices-header">
			<h1>Improve the lives of millions. <br/> Change yours forever</h1>
			<p>More than 1000 team mates share our same vision, goals and passion. With offices in Warsaw, Barcelona, Istanbul, Rome, Mexico City and Curitiba, our search for great talent never stops.</p>
        </div>
        <div className="office-cards">
            {officeData.map((el,i)=>
                <a key={i} href={el.link}>
                    <div className="office">
                        <img src={require(el.imageSrc+"")} alt=""/>
                        <div className="office-cards-desc">
                            <p>{el.country}</p>
                            <span className="office-btn">SEE OPENNINGS</span>
                        </div>
                    </div>
                </a>
                )}
        </div>
    </section>

}

export default Office