import '../static/css/sideBar.css'

type props = {
    listOptions:
        {
            title:string,
            icon:JSX.Element
        }[]
    ,
    setSelected:(a:number)=>void;
    selected:number,
    width:string
}

export const SideBar = (props:props) =>{
    return <ul style={{width:props.width}} className='sideBar'>
        {props.listOptions.map((option,index)=>{
            return <li 
                className={(index === props.selected)?'selectedSideBar':''}
                onClick={()=>props.setSelected(index)}
                >
                    {option.icon}
                    {option.title}
                </li>
        })}
    </ul>
}

export default SideBar;