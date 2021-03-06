import React, {useState, useEffect} from 'react'
import { isConstructorDeclaration } from 'typescript';
import {LeftSidebar, RightSidebar} from './Sidebar';


type PointProps = {
    leftPercent: number,
    topPercent: number,
    label: string,
    id: number,
}

type DisplayPointProps = PointProps & {
    color: string
    initialClicked: boolean
}

const DisplayLable = React.memo((props: PointProps):JSX.Element => {
    const {leftPercent, topPercent, label, id} = props;
    return (
        <div className="ScatterGraphBox-wrapper">
            <p style={{position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%`}} className="label">{label}</p>
        </div>
    )
});


const DisplayPoint = React.memo((props: DisplayPointProps):JSX.Element => {
    const {leftPercent, topPercent, label, id, color, initialClicked} = props;
    const [isHover, setHover] = useState(false);
    const [isClicked, setClicked] = useState(false);

    useEffect(() => {
        setClicked(initialClicked)
    }, [initialClicked])
    console.log(isHover)
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="circle" style={{backgroundColor: color, position: 'absolute', top: `${topPercent}%`, left: `${leftPercent}%`}}　onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={() => setClicked((prevState) => !prevState)}></div>
            {(isHover || isClicked) && <DisplayLable leftPercent={leftPercent+1} topPercent={topPercent} label={label} id={id} />}
        </div>
    )
})

type DisplayScatterGraphByPerClassProps = {
    pointList: Array<PointProps>,
    color: string
    initialAppear: boolean
}

const DisplayScatterGraphByPerClass = (props: DisplayScatterGraphByPerClassProps) => {
    const { pointList, color, initialAppear } = props;
    return (
        <>
        {pointList.map((pointData) => {
            return (
                <DisplayPoint leftPercent={pointData.leftPercent} topPercent={pointData.topPercent} label={pointData.label} key={pointData.id} id={pointData.id} color={color} initialClicked={initialAppear} />
            )
        })}
        </>
    )
}

type DisplayScatterGraphProps = {
    pointLists: Array<Array<PointProps>>,
    canDisplay: Array<boolean>,
    initialAppear: boolean,
}




const DisplayScatterGraph = (props: DisplayScatterGraphProps) => {
    const { pointLists, canDisplay, initialAppear } = props;
    const idx_to_color: { [key: number]: string; } = {0: "red", 1: "orange", 2: "yellow", 3: "green", 4: "purple", 5: "blue"}
    return (
        <div className="ScatterGraphBox-wrapper">
            <div className="ScatterGraphBox">
                {
                pointLists.map((pointList, idx) => {

                    return (
                    canDisplay[idx] && <DisplayScatterGraphByPerClass pointList={pointList} key={idx} color={idx_to_color[idx]} initialAppear={initialAppear} />
                    )
                })
                }
            </div>
        </div>
    )
}


const MainCompornet = () => {
    const classLabels = ["H28", "H29", "H30", "R01"]
    //const classLabels = ["10, 20代", "30代", "40代", "50代", "60代", "70代〜"]
    const [data, setData] = useState<Array<Array<PointProps>>>([[]])
    const [canDisplay, setCanDisplay] = useState<Array<boolean>>([true, true, true, true, true, true, true])
    const [initialAppear, setInitialApper] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/post`, {method: 'POST'})
       .then(res => res.json())
       .then(d => {
            setData(d)
        })
        .catch(error => {
            console.log(error)
        })  
    }, [])
    

    return (
        <>
            <div className="left-sidebar">
                <LeftSidebar setInitialApper={setInitialApper} />
            </div>
            <button>年度別</button>
            <button>年齢別</button>
            <DisplayScatterGraph pointLists={data} canDisplay={canDisplay} initialAppear={initialAppear} />
            <div className="right-sidebar">
                <RightSidebar classLabels={classLabels} canDisplay={canDisplay} setCanDisplay={setCanDisplay} />
            </div>
        </>
    )
}

export default MainCompornet
