import React from 'react'
import Presentation from './Presentation'
import ColoredCard from './ColoredCard'
import Brands from './Brands'
import Stats from './Stats'
import Office from './Office'

const MainSection = (props) => {
    return <div>
            <Presentation presentationData={props.presentationData}/>
            <ColoredCard coloredCardData={props.coloredCardData}/>
            {/* <Brands/> */}
            <Stats statsData={props.statsData}/>
            {/* <Office officeData={props.officeData}/> */}
        </div>
}

export default MainSection