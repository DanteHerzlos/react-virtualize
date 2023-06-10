import cl from '../styles/components/GridElement.module.css'

interface GridElementProps {
  text:string
}

const GridElement:React.FC<GridElementProps> = ({text}) => {

  return (
    <div className={cl.element}>
      <span className={cl.text}>{text}</span>
    </div>
  )
}

export default GridElement
