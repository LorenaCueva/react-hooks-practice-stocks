import React from "react";
import Stock from "./Stock";

function PortfolioContainer({stocks, onStockClick}) {

  const portafolioStocks = stocks.map(stock => <Stock key={stock.id} stock={stock} onStockClick={onStockClick}/>)
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portafolioStocks
      }
    </div>
  );
}

export default PortfolioContainer;
