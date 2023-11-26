 
interface Props{
    title:string;
    description?:string;
    subtitle:string
}
export const Heading = ({title,description,subtitle}:Props) => {
  return (
    <div className="w-full flex justify-center gap-3">
        <h1>{title}</h1>
        <h1 >{subtitle}</h1>
        <h1 >{description}</h1>
    </div>
  )
}

 