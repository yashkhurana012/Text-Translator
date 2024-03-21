import { useState } from 'react';
import './texttranslator.css'
import { useEffect } from 'react';
let TRANSLATOR = () => {

    const [language , setLanguage] = useState([]);
    const [source , setSource] = useState("af");
    const [target , setTarget] = useState("af");
    const [sourceLang , setSourceLang] = useState("");
    const [translate , setTranslate] = useState("");


    
    //get Language
    const urls = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const optionss = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '94070d7aa3msh9607442c4f027adp1cfa15jsn49d074cda897',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    let getLanguage = async () => {
        try {
            const response = await fetch(urls, optionss);
            const result = await response.json();
            setLanguage(result.data.languages)
        } catch (error) {
            console.error(error);
        }
    }



    //translate
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '94070d7aa3msh9607442c4f027adp1cfa15jsn49d074cda897',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: source,
            target_language: target,
            text: sourceLang
        })
    };

    let translatetext = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if(result.status == "success"){
                setTranslate(result.data.translatedText)
            }
            else{
                setTranslate(result.message)
            }
            
            
        } catch (error) {
            console.error(error);
        }
    }




    useEffect(() => {
        getLanguage();
    } , [])

    return (
        <div className="cont">
            <h1>Text Translator</h1>
            <div className="inputs">
                <div className="source">
                    <p>Source Language : </p>
                    <select onChange={(e) => setSource(e.target.value)}>
                        {
                            language.map((Element,index) => <option key={index} value={Element.code}>{Element.name}</option>)
                        }
                    </select>
                </div>

                <div className="target">
                    <p>Target Language : </p>
                    <select onChange={(e) => setTarget(e.target.value)} >
                        {
                            language.map((Element , index) => <option key={index} value={Element.code}>{Element.name}</option>)
                        }
                    </select>
                </div>
                <input type="text" placeholder='Enter Text you want to translate' value={sourceLang} onChange={(e) => setSourceLang(e.target.value) }/>
            </div>
            <div className="translated_text">
                <p>{translate}</p>
            </div>
            <button onClick={() => {
                if(sourceLang == ""){
                    alert("Enter some text")
                }
                else{
                    translatetext();
                    setSourceLang("");
                }
                
            }}>Translate</button>
        </div>
    )
}

export default TRANSLATOR;