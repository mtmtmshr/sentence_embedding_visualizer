import React, {useState} from 'react'
import { isConstructorDeclaration } from 'typescript';

type PointPorps = {
    leftPercent: number,
    topPercent: number,
    label: string,
    id: number,
    color: string
}


const DisplayLable = React.memo((props: PointPorps):JSX.Element => {
    const {leftPercent, topPercent, label, id, color} = props;
    console.log("a")
    return (
        <div className="ScatterGraphBox-wrapper">
            <p style={{position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%`}} className="label">{label}</p>
        </div>
    )
});


const DisplayPoint = React.memo((props: PointPorps):JSX.Element => {
    const {leftPercent, topPercent, label, id, color} = props;
    const [isHover, setHover] = useState(false);
    const [isClicked, setClicked] = useState(false);
    console.log(isHover)
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="circle" style={{backgroundColor: color, position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%`}}　onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={() => setClicked((prevState) => !prevState)}></div>
            {(isHover || isClicked) && <DisplayLable leftPercent={leftPercent+1} topPercent={topPercent} label={label} id={id} color={color}/>}
        </div>
    )
})

type DisplayScatterGraphByPerLabelProps = {
    pointList: Array<PointPorps>,
}

const DisplayScatterGraphByPerLabel = (props: DisplayScatterGraphByPerLabelProps) => {
    const { pointList } = props;
    return (
        <>
        {pointList.map((pointData) => {
            return (
                <DisplayPoint leftPercent={pointData.leftPercent} topPercent={pointData.topPercent} label={pointData.label} key={pointData.id} id={pointData.id} color={pointData.color} />
            )
        })}
        </>
    )
}

type DisplayScatterGraphProps = {
    pointLists: Array<Array<PointPorps>>,
}

const DisplayScatterGraph = (props: DisplayScatterGraphProps) => {
    const { pointLists } = props;
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="ScatterGraphBox">
                {
                pointLists.map((pointList, idx) => {

                    return (
                    <DisplayScatterGraphByPerLabel pointList={pointList} key={idx}/>
                    /*
                    pointList.map((pointData) => {
                        return (
                            <DisplayPoint leftPercent={pointData.leftPercent} topPercent={pointData.topPercent} label={pointData.label} key={pointData.id} id={pointData.id} color="red" />
                        )
                    })
                    */
                    )
                })
                }
            </div>
        </div>
    )
}


const MainCompornet = () => {
    const data:Array<Array<PointPorps>> = [[{leftPercent: 10, topPercent: 20, label: "今日は天皇とBBQ", id: 0, color: "blue"}, {leftPercent: 20, topPercent: 20, label: "今日は天皇と海水浴", id: 1, color: "blue"}], [{leftPercent: 50, topPercent: 80, label: "今日は彼女とBBQ", id: 3, color: "red"}, {leftPercent: 60, topPercent: 70, label: "今日は彼女と海水浴", id: 4, color: "red"}]]
    return (
        <div>
            <DisplayScatterGraph pointLists={data}/>
        </div>
    )
}

export default MainCompornet
