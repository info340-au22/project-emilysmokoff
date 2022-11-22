import React, {useState} from 'react';

export function SearchForm(props) {

    const [typedValue, setTypedValue] = useState("");
  
    const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      setTypedValue(value); //update state and re-render!
    }
  
    const handleSubmit = (event) => {
      props.applyFilterCallback(typedValue.toLowerCase());
    }
  
    return (
      <form className='search-page-form'>
            <input className="search-page-bar" id="search-input" type="text" name="search"
                placeholder=" Search for products, categories, ..."
                onChange={handleChange}
                value={typedValue}/>
          <button type="button" className="btn btn-light btn-style" onClick={handleSubmit}>
            <span id="search-icon" className="material-icons">search</span>
          </button>
      </form>
    )
}