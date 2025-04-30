import React from 'react'

const ShopFilter = ({filter,filterState,setfilterState,clearFilter}) => {
    return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:block space-y-5 flex-shrink-0'>
       
         {/* filter for category */}
        <div className='flex flex-col space-x-2'>
            <h3>Filters</h3> 
            <h4 className='md:mt-5 text-lg font-medium'>Category</h4>
             <hr />
             {
                filter.categories.map((category)=>(
                    <label key={category} className='cursor-pointer'>
                        <input type="radio" name='category' id='category' value={category}
                         checked = {filterState.categories === category}
                         onChange={(e)=> setfilterState({...filterState , categories:e.target.value})}
                        />
                        <span className='ml-1 capitalize'>{category}</span>
                    </label>
                ))
             }
        </div>
        {/* filter for color */}
        <div className='flex flex-col space-x-2'>
            <h4 className='text-lg font-medium'>Color</h4>
             <hr />
             {
                filter.color.map((color)=>(
                    <label key={color} className='cursor-pointer'>
                        <input type="radio" name='color' id='color' value={color}
                         checked = {filterState.color === color}
                         onChange={(e)=> setfilterState({...filterState , color:e.target.value})}
                        />
                        <span className='ml-1 capitalize'>{color}</span>
                    </label>
                ))
             }
        </div>
        {/* filter for price */}
        <div className='flex flex-col space-x-2'>
            <h4 className='text-lg font-medium'>Price</h4>
             <hr />
             {
                filter.priceRange.map((range)=>(
                    <label key={range.label} className='cursor-pointer'>
                        <input type="radio" name='priceRange' id='priceRange'
                         value={`${range.min}-${range.max}`}
                         checked = {filterState.priceRange === `${range.min}-${range.max}`}
                         onChange={(e)=> setfilterState({...filterState , priceRange:e.target.value})}
                        />
                        <span className='ml-1'>{range.label}</span>
                    </label>
                ))
             }
        <button onClick={clearFilter} className='mt-6 btn'>Clear All</button>
        </div>
    </div>
  )
}

export default ShopFilter