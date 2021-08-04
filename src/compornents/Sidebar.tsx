import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';


type LeftSidebaprops = {
    setInitialApper: (params: boolean) => any
}

const LeftSidebar = (props: LeftSidebaprops) => {
    const { setInitialApper } = props;
    return (
        <div className="sidebar-wrapper">
            <button onClick={()=>setInitialApper(true)}>ラベルを全表示</button>
            <button onClick={()=>setInitialApper(false)}>ラベルを非表示</button>
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
    canDisplay: Array<boolean>,
    setCanDisplay: (params: Array<boolean>) => void
}

const RightSidebar = React.memo((props: RightSidebaprops) => {
    const {classLabels, canDisplay, setCanDisplay} = props; 
    const idx_to_color: { [key: number]: string; } = {0: "red", 1: "orange", 2: "yellow", 3: "green", 4: "purple", 5: "blue"}
    return (
        <div className="sidebar-wrapper">
        <div style={{color: "black"}}>凡例</div>
        {
            classLabels.map((classLabel, index) => {
                return <DisplayLegend classLabel={classLabel} color={idx_to_color[index]} checked={canDisplay} setCanDisplay={setCanDisplay} index={index} key={index} />
            }
            )
        }
        </div>
    )
})

export {LeftSidebar, RightSidebar}
