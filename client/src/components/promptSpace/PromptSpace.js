import { useEffect, useState } from "react";
const PromptSpace = () => {
    const [comment, setComment] = useState("");
    const [rxcData,setRxcData] = useState("")
    const [showSpam,setShowSpam] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        fetch(`http://localhost:4000/checkComment?q=${comment}`)
        .then((res)=>res.json())
        .then((data)=>setRxcData(data))
        .catch((err)=>{console.log(err)})
                 
    };
    const isSpam = ()=>{
        if(rxcData.spam === "'1'"){
            console.log("Comment is detected as SPAM! ")
            setShowSpam("Comment is detected as SPAM! ")
        }
        else if(rxcData.spam=="'0'"){
            console.log("Comment is detected as NOT SPAM! ")
            setShowSpam("Comment is detected as NOT SPAM! ")
        }
    }
    useEffect(()=>{
        console.log("this is use effect")
        isSpam()
    },[rxcData.spam])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter comment</p>
                <input
                    type="text"
                    id="passage-input"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <button>Check if Spam</button>
                <p>{rxcData && "comment : "+rxcData.comment}</p>
                <p>{showSpam}</p>

            </form>
            <p></p>
        </div>
    );
};
export default PromptSpace;
