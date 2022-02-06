import React from "react";

const Filter = ({handleFilterChange}) => 
  <div>
    find countries <input
      onChange={handleFilterChange}
    />
</div>

export default Filter
