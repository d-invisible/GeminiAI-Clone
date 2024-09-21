import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input,setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    

    const onSent = async (prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        let resNoHash = response.startsWith("##")? response.replace("##", ""): response;
        // let responseArray = resNoHash.split("**");
        let newResponse=resNoHash.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");;
        // for(let i=0; i< responseArray.length;i++){
        //     if (responseArray[i]){
        //         if(i === 0 || i%2 ===0){
                
        //             newResponse+=responseArray[i];
        //         }
        //         else{
        //             newResponse+= "<b>"+responseArray[i]+"</b>";
        //         }
        //     } 
            
        // }


        let newResponse2= newResponse.split("*").join("")
        


        let resFinal = newResponse2.replace(/\n/g, "<br>");

        setResultData(resFinal)
        setLoading(false)
        setInput("")
    }

    // onSent("what is react js")


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput

    }


    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider