import React from 'react'

const ListSuggestion = (props) => {

  const suggestionsToShow = [ ...new Set(props.suggestions) ]

  return (
    <datalist id={props.id} >
      {suggestionsToShow.map(s => 
        <option key={s} value={s} ></option>
      )}
    </datalist>
  )
}

export default ListSuggestion