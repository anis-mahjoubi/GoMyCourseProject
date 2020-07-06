import React from 'react'

const Stats = ({statsData}) => {
    return <section className="stats">
        <div className="stats-header">
            <h1>The world's<br/>biggest elearning platform</h1>
            <p>Any skills, any domain. Create your content, interact with students and your course will be the biggest</p>
            {/* <img src={require("./img/logo.png")} alt="" className="stat-img"/> */}
            <div style={{ fontSize: "30px", color:"#00b39b" }} ><i class="fab fa-accusoft fa-10x"></i></div>
        </div>
        <div className="stat-grids-container">
            {statsData.map((el,i)=> <div key={i} className="stat-grids">
                    <img src={require(el.imgSrc+"")} alt="flag"/>
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                </div>


            )}
        </div>

    </section>
}

export default Stats