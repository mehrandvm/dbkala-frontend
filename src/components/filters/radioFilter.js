import React, { useEffect, useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"

const getFieldOptions = (data, field) => [...new Set(data.map((item)=> item[field]))];

const RadioFilter = (props) => {
  const { data, field, filters, setFilters } = props
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(getFieldOptions(data, field))
  }, [data, field])

  const handleChange = (event) => {
    setFilters({ ...filters, [field]: event.target.value })
  }

  return (
    <FormControl component="fieldset">
      {/*<FormLabel component="legend">{field}</FormLabel>*/}
      <RadioGroup value={filters[field]} onChange={handleChange}>
        {options.map((option, i) => (
          <FormControlLabel value={option} control={<Radio/>} label={option} key={i}/>
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioFilter