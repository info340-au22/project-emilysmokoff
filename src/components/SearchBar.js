import React, {useState} from 'react';

export function SearchBar(props) {

    return (
    <div>
        <div className='search-header'>
            <div className='search-h2'>Browse Products</div>
        </div>
        <div className='bookmarked'>
            <Search/>
        </div>
    </div>
    )
}

function Search(props) {
    const [typedValue, setTypedValue] = useState("");
  
    const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      setTypedValue(value); //update state and re-render!
    }
  
    const handleSubmit = (event) => {
        console.log("search for", typedValue);
        props.applyFilterCallback(typedValue);
    }
  
    return (
      <form className='search-page-form'>
            <input className="search-page-bar" id="search-input" type="text" name="search"
                placeholder=" Search for products, categories, ..."
                onChange={handleChange}
                value={typedValue}/>
          <button type="button" className="btn btn-light" onClick={handleSubmit}>
            <span id="search-icon" className="material-icons">search</span>
          </button>
      </form>
    )
}