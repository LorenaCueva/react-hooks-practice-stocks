import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stockList, setStockList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(()=> {
    fetch("http://localhost:3001/stocks")
    .then(r => r.json())
    .then(stocks => {
      const updatedStocks = stocks.map(stock => {return {...stock, bought: false}})
       setStockList(updatedStocks)})
    .catch(error => console.error(error));
  },[])

  function handleStockClick(stock){
    const updatedStocks = stockList.map(s => s.name === stock.name ? stock : s);
    setStockList(updatedStocks);
  }

  function handleOnFilter(filterBy){
      setFilter(filterBy);
  }

  function handleOnSort(sortBy){
    setSort(sortBy);
  }


  let stocksToDisplay = filter === "All" ? stockList : stockList.filter(stock => stock.type === filter);
  
  switch(sort){
    case "" : break;
    case "Alphabetically" : {
        stocksToDisplay = stocksToDisplay.sort((a,b) => a.name.localeCompare(b.name));
        break;}
    case "Price" :{
        stocksToDisplay = stocksToDisplay.sort((a,b)=> a.price - b.price);
    }
  }
  const portafolioStocks = stocksToDisplay.filter(stock=> stock.bought === true);


  return (
    <div>
      <SearchBar onFilter={handleOnFilter} onSort={handleOnSort}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksToDisplay} onStockClick={handleStockClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portafolioStocks} onStockClick={handleStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
