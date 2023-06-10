import cl from "../styles/components/HElement.module.css"
interface HElementProps {
  text:string
}

const HElement:React.FC<HElementProps> = ({text}) => {
  return (
    <div className={cl.element}>
      <span className={cl.text}>{text}</span>
    </div>
  )
}

export default HElement
