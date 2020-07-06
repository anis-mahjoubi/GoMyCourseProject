import React from 'react'

const Presentation = ({presentationData}) =>{
    return <section className="presentation">
            {/* <img src={require(presentationData.logoSrc+"") } alt="" style={{display: "block", margin: "10px auto"}}/> */}
        <i class="fab fa-accusoft fa-5x"></i>
            {/* <img src={require ("./img/sygnet.png")} alt="" style={{display: "block", margin: "10px auto"}}/> */}
            <h1 style={{textAlign: "center", margin: "30px 0", fontSize: "2.125rem"}}>{presentationData.title}</h1>
            <div className="presentation-grid">
                {presentationData.paragraph.map((el,i)=><p  key={i} className="grid-content"> {el} </p>)}
            </div>
        </section>
}

export default Presentation