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

  const grouped = presales.reduce((acc, presale) => {
    if(!acc[presale.event_id]) {
      acc[presale.event_id] = {
        event_id: presale.event_id,
        event_name: presale.event_name,
        venue: presale.venue,
        event_date_time: presale.event_date_time,
        event_url: presale.event_url,
        presales: []
      }
    } else {
    }
    acc[presale.event_id].presales.push(presale)
    return acc
  }, {})
  
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
        {Object.values(grouped).map((group) => (
          <div key={group.event_id}>
            <h2>{group.event_name} at {group.venue}</h2>
            <p>Show Time: {group.event_date_time}</p>
            <a href={group.event_url} target="_blank">Buy Tickets</a>

            {group.presales.map((presale) => (
              <div key={presale.presale_name + presale.presale_start}>
              <p>{presale.presale_name} - {presale.presale_status} - {presale.presale_start} - {presale.presale_end}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
