import React from 'react'

const ListSuggestion = (props) => {
  return (
    <datalist id={props.id} >
      {props.suggestions.map(suggestion => 
        <option key={suggestion} value={suggestion} ></option>
      )}
    </datalist>
  )
}

export default ListSuggestion