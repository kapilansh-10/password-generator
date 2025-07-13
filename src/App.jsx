import { useCallback, useEffect, useState, useRef } from "react"
import "./App.css"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
  
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charactersAllowed) str += "!@#$%^&*+_=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
      
    }

    setPassword(pass)

  },[length, numberAllowed, charactersAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    },1000)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charactersAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator</h1>
    <div className="flex items-center shadow rounded-lg mb-4">
        <input 
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 bg-white text-black"
        placeholder="Password"
        readOnly
        ref={passwordRef}
        />
        
        <div className="relative">
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3.5 py-1 shrink-0">copy</button>
          <span className={`absolute -top-8 left-1/2 -translate-x-1/2 
                bg-black text-white text-xs px-2 py-1 rounded 
                transition-all duration-300 
                ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>Copied!</span>
        </div>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e) => {setLength(e.target.value)}}
        className="cursor-pointer"
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id="number-input"
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }}
        />
        <label >Numbers</label>
        <input 
        type="checkbox"
        defaultChecked={charactersAllowed}
        id="character-input"
        onChange={() => {
          setCharactersAllowed((prev) => !prev)
        }}
        />
        <label>Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App
