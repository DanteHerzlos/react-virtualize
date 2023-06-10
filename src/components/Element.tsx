import cl from "@styles/components/Element.module.css";
import { forwardRef } from "react";
interface ElementProps extends React.HTMLAttributes<HTMLDivElement>{
  text: string;
}

const Element = forwardRef<HTMLSpanElement, ElementProps>(({ text, ...rest }, ref) => {
  return (
    <div {...rest} className={[cl.element, rest.className].join(" ")}>
      <span ref={ref}className={cl.text}>{text}</span>
    </div>
  );
});

export default Element;
