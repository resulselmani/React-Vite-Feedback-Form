import { useState } from 'react'
import './App.css'
import FeedbackForm from './ components/FeedbackForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <FeedbackForm />
    </div>
  )
}

export default App;