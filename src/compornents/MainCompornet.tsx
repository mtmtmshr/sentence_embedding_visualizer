import React, {useState} from 'react'

type DisplayPointPorps = {
    leftPercent: string,
    topPercent: string,
    label: string,
}


const DisplayLable = React.memo((props: DisplayPointPorps):JSX.Element => {
    const {leftPercent, topPercent, label} = props;
    console.log("a")
    return (
        <div className="ScatterGraphBox-wrapper">
            <p style={{position: 'absolute', top: topPercent, left: leftPercent}} className="label">{label}</p>
        </div>
    )
});


const DisplayPoint = React.memo((props: DisplayPointPorps):JSX.Element => {
    const {leftPercent, topPercent, label} = props;
    const [isHover, setHover] = useState(false);
    const [isClicked, setClicked] = useState(false);
    console.log("b")
    console.log(isClicked)
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="circle" style={{position: 'absolute', top: topPercent, left: leftPercent}}　onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={() => setClicked((prevState) => !prevState)}></div>
            {(isHover || isClicked) && <DisplayLable leftPercent={"51%"} topPercent={"50%"} label={"今日は天皇とBBQ"} />}
        </div>
    )
})


const DisplayScatterGraph = () => {
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="ScatterGraphBox">
                <DisplayPoint leftPercent={"50%"} topPercent={"50%"} label={"今日は天皇とBBQ"} />
            </div>
        </div>
    )
}


const MainCompornet = () => {
    return (
        <div>
            <DisplayScatterGraph />
        </div>
    )
}

export default MainCompornet
