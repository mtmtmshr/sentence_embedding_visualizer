import React from 'react'

const LeftSidebar = () => {
    return (
        <div className="sidebar-wrapper">
            
        </div>
    )
}

type DisplayLegendProps = {
    classLabel: string,
    color: string
}

const DisplayLegend = (props:DisplayLegendProps) => {
    const {classLabel, color} = props;
    return (
        <>
            <div className="perClasses">
                <div className="circle" style={{backgroundColor: color, marginLeft: 10}}></div>
                <p>{classLabel}</p>
            </div>
        </>
    )
}

type RightSidebaprops = {
    classLabels: Array<string>,
    colors: Array<string>,
}

const RightSidebar = (props: RightSidebaprops) => {
    const {classLabels, colors} = props; 
    return (
        <div className="sidebar-wrapper">
        <div style={{color: "black"}}>凡例</div>
        {
            classLabels.map((classLabel, index) => {
                return <DisplayLegend classLabel={classLabel} color={colors[index]}/>
            }
            )
        }
        </div>
    )
}

export {LeftSidebar, RightSidebar}
