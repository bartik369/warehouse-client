import './App.scss'
import {Routes, Route} from 'react-router-dom'
import Signin from './components/pages/signin/Signin'

function App() {
  return (
    <>
    <Routes>
      <Route path='signin' element={<Signin/>}/>
    </Routes>
    </>
  )
}

export default App
