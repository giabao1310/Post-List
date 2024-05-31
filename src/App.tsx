import './App.css'
import PostTable from './components/postTable'

function App() {

  return (
    <div className="App">
      <div className='header'>
        <h1>Post List</h1>
        <button className='add-btn'>Add</button>
      </div>
      <PostTable />
    </div>

  )
}

export default App
