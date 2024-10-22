import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Password Generator</h1>
      <form>
        <label className="container-length">
          Length Password
          <input type="range" min="1" max="64" />
        </label>
        <label className="container-uppercase">
          <input type="checkbox" />
          Include Uppercase Letters
        </label>
        <label className="container-uppercase">
          <input type="checkbox" />
          Include Lowercase Letters
        </label>
        <label className="container-uppercase">
          <input type="checkbox" />
          Include Numbers
        </label>
        <label className="container-uppercase">
          <input type="checkbox" />
          Include Symbols
        </label>
        <button>GENERATE</button>
      </form>
      <div className="container-strength">
        <p>STRENGTH</p>
      </div>
    </div>
  );
}

export default App;
