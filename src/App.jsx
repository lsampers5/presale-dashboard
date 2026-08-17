import { useState } from 'react'
import './App.css'

function App() {
  const [presales, setPresales] = useState([])

function fetchPresales(artist) {
  fetch(`http://127.0.0.1:8000/presales?artist=${artist}`)
  .then(response => response.json())
  .then(data => setPresales(data))
}

  const [searchText, setSearchText] = useState('')


  
  return (
    <>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={() => fetchPresales(searchText)}>Search</button>
      <p>You typed: {searchText}</p>
      <p>Presales</p>
      <div>
        {presales.map((presale) => (
          <p key={presale.event_name + presale.start}>
            {presale.event_name} - {presale.status} - {presale.start} to {presale.end}
          </p>
        ))}
      </div>
    </>
  )
}

export default App
