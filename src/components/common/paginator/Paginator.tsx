import React, { useState, useEffect } from 'react';
import S from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number,
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

const Paginator:React.FC<PropsType> = ({ totalItemsCount, 
                                        pageSize, 
                                        currentPage = 1, 
                                        onPageChanged = x => x, 
                                        portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage, portionSize])

    return (
        <div  className={cn(S.paginator)}>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p =>
                    <button  className={cn({
                        [S.selectedPage]: currentPage === p
                    }, S.pageNumber)} onClick={(e) => { onPageChanged(p) }}>{p}</button>)}

            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    )
}

export default Paginator