import localFont from "next/font/local";

interface vericleParams {
    number: number;
    text: string;
}


const myFont = localFont({ src: "../fonts/Zodiak-Light.ttf" });
const Versicle = (params: vericleParams) => {
    const { number, text } = params;
    return (
        <>
        <h1 className="text-white text-3xl">
            <span className="text-gray-400 text-xl mr-1 my-1">{number}</span>
            <span className="text-white text-2xl">{text}</span>
        </h1>
        </>
    );
}
 
export default Versicle
