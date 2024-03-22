import React  from "react";
import {useTable, usePagination,useRowSelect} from 'react-table';

import './table.css'
import {Select,MenuItem} from '@mui/material'
import { Container } from '@mui/system';
import { Checkbox } from "./Checkbox";


export const BasicTable =({columns,data,handleInputChange}) =>{

 
   
    
 
    
    
    const tableInstance= useTable({
        columns,
        data,
        initialState:{pageIndex:0, pageSize: 20},
        
    },usePagination, useRowSelect,
    (hooks) => {
        hooks.visibleColumns.push((columns) =>{
            return [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />

                    ),
                    Cell: ({row}) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )

                },
                ...columns
            ]
        })
    }
    )
    const {getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        value,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        pageOptions,
        selectedFlatRows,
        gotoPage,
        pageCount,
        
        state:{pageIndex, pageSize},

    }=tableInstance

    const firstPageRows =page
    return ( <Container>
        <div>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroups)=> (
                <tr {...headerGroups.getHeaderGroupProps()}>
                   {headerGroups.headers.map((column)=> (
                    <th {...column.getHeaderProps()}>{column.render('Header')} </th>
                   ))}
                    
                </tr>

            ))}
                
            </thead>
            <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row)=>{
                prepareRow(row)
                return(
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) =>{
                        return  <td {...cell.getCellProps()}>
                        {cell.column.editEnable ? (
                            row.original.isEditing ? (
                              <input
                                type="text"
                                defaultValue={cell.value}
                                onChange={(e) =>
                                  handleInputChange(e, row, cell.column.id)
                                }
                              />
                            ) : (
                              cell.render("Cell")
                            )
                          ) : (
                            cell.render("Cell")
                          )}
                      
                        
                        
                        </td>
                    })}
               
                </tr>
                )
            })}
                
            </tbody>
        </table>
<div>
<span>
    Страница{' '}
    <strong>
        {pageIndex+1} of {pageCount}
    </strong> {' '}
</span>
<span>
    | Перейти на:{' '}
    <input type='number'
    defaultValue={pageIndex+1}
    onChange={(e) => {
        const pageNumber=e.target.value ? Number(e.target.value)-1:0
        gotoPage(pageNumber)
    }}
    style={{width:'60px'}} />


</span>
<Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
   
{[10,20,25,35,50,100].map((pageSize)=>(
    <MenuItem key={pageSize} value={pageSize}>
        Страниц {pageSize}

    </MenuItem>
))}

</Select>
</div>

<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    {'⇚'}


</button>

    <button onClick={( )=> previousPage()} disabled={!canPreviousPage}>⇤Предыдущая</button>
    <button onClick={()=> nextPage()} disabled={!canNextPage}>Следующая⇥</button>
    <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>
    {'⇛'}

    
</button>


        </div>
<pre>
    <code>
        {JSON.stringify(
            {selectedFlatRows:selectedFlatRows.map((row) => row.original),
            },
            null
        )}
    </code>
</pre>

        </Container>
    )
}