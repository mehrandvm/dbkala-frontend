import React, { useCallback, useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { getSearch } from "../apis/laptops/laptopsAPI"
import { useStyles } from "./homeStyles"

import RadioFilter from "./filters/radioFilter"
import BoolFilter from "./filters/boolFilter"
import RangeFilter from "./filters/rangeFilter"
import Button from "@material-ui/core/Button"

import * as _ from 'lodash'

const laptopFilters = {
  cpu: "radio",
  gpu: "radio",
  gpu_ram_size: "radio",
  ram_size: "radio",
  manufacturer: "radio",
  color: "radio",
  is_original: "bool",
  is_available: "bool",
  fast_delivery: "bool",
  price: "range",
  weight: "range"
}

const filtersInitialState = {
  cpu: null,
  gpu: null,
  gpu_ram_size: null,
  ram_size: null,
  manufacturer: null,
  color: null,
  is_original: null,
  is_available: null,
  fast_delivery: null,
  price: null,
  weight: null
}

const returnFilters = (data, field, type, filters, setFilters) => {
  switch (type) {
    case "radio":
      return <RadioFilter data={data} field={field} filters={filters} setFilters={setFilters}/>
    case "bool":
      return <BoolFilter/>
    case "range":
      return <RangeFilter/>
    default:
      return null
  }
}

const returnFiltersAccordion = (data, filters, setFilters) => {
  const filterNames = Object.keys(laptopFilters)
  const filterTypes = Object.values(laptopFilters)
  return filterNames.map((field, i) => {
    return (
      <Accordion key={i}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
        >
          <Typography>{filters[field] === null ? field : `${field}*`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {returnFilters(data, field, filterTypes[i], filters, setFilters)}
        </AccordionDetails>
      </Accordion>
    )
  })
}

const Home = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [filters, setFilters] = useState(filtersInitialState)

  const sendSearchRequest = () =>
    getSearch(searchQuery).then((res) => {
      setData(res.data)
    }).catch((err) => console.error("fetch-error", err))

  const searchCallback = useCallback(_.debounce(sendSearchRequest, 500), [searchQuery])

  useEffect(() => {
    searchCallback()
    return searchCallback.cancel;
  }, [searchCallback, searchQuery])

  const clearFilters = () => setFilters(filtersInitialState)

  const handleSearch = (event) => setSearchQuery(event.target.value)

  console.log(filters)
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            DbKala
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} alignItems={"flex-start"}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                {/*filters*/}
                <Button variant={"contained"} color={"primary"} onClick={clearFilters}>Clear Filters</Button>
                {data.length !== 0 ? returnFiltersAccordion(data, filters, setFilters) : null}
              </Paper>
            </Grid>
            <Grid container item xs={12} md={8} lg={9} spacing={1}>
              {/* items */}
              {data.map((item, i) => {
                return (
                  <Grid item xs={6} md={4} key={i}>
                    <Paper className={classes.paper}>
                      <Typography>
                        {item.name}
                      </Typography>
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Home