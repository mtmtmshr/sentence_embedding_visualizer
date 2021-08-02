import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';

const LeftSidebar = () => {
    return (
        <div className="sidebar-wrapper">
            
        </div>
    )
}

type DisplayLegendProps = {
    classLabel: string,
    color: string,
    checked: Array<boolean>,
    setCanDisplay: (params:Array<boolean>) => void
    index:number
}

const DisplayLegend = React.memo((props:DisplayLegendProps) => {
    const {classLabel, color, checked, setCanDisplay, index} = props;
    const newChecked = [...checked];
    return (
        <>
            <div className="perClasses">
                <div className="circle" style={{backgroundColor: color, marginLeft: 10}}></div>
                <p>{classLabel}</p>
                <Checkbox
                    checked={checked[index]}
                    name="checkedF"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, ckd: boolean) => {
                        newChecked[index] = ckd
                        setCanDisplay(newChecked)
                    }
                    }
                />
            </div>
        </>
    )
})

type RightSidebaprops = {
    classLabels: Array<string>,
    colors: Array<string>,
    canDisplay: Array<boolean>,
    setCanDisplay: (params: Array<boolean>) => void
}

const RightSidebar = (props: RightSidebaprops) => {
    const {classLabels, colors, canDisplay, setCanDisplay} = props; 
    return (
        <div className="sidebar-wrapper">
        <div style={{color: "black"}}>凡例</div>
        {
            classLabels.map((classLabel, index) => {
                return <DisplayLegend classLabel={classLabel} color={colors[index]} checked={canDisplay} setCanDisplay={setCanDisplay} index={index}/>
            }
            )
        }
        </div>
    )
}

export {LeftSidebar, RightSidebar}
