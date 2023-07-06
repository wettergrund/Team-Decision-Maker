import React, { useEffect, useState } from 'react'

import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    
  } from '@tanstack/react-table'

import axios from 'axios'



  interface BoardModel {
    boar_Id: number;
    title: string;
    description: string;
  }
  
  interface Factor {
    factorId: number;
    factorName: string;
    weight: number;
    boardId: number;
    boardModel: BoardModel;
  }
  
  interface Item {
    item_Id: number;
    title: string;
    boardId: number;
    boardModel: BoardModel;
  }
  
  interface ApiResponse {
    board: BoardModel;
    factors: Factor[];
    items: Item[];
  }

  
  
  const columnHelper = createColumnHelper<ApiResponse>()
  
//   const columns = [
//     columnHelper.accessor('firstName', {
//       cell: info => info.getValue(),
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor(row => row.lastName, {
//       id: 'lastName',
//       cell: info => <i>{info.getValue()}</i>,
//       header: () => <span>Last Name</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('age', {
//       header: () => 'Age',
//       cell: info => info.renderValue(),
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('visits', {
//       header: () => <span>Visits</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('status', {
//       header: 'Status',
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('progress', {
//       header: 'Profile Progress',
//       footer: info => info.column.id,
//     }),
//   ]


  



  function Table() {
    const [data, setMyData] = useState<ApiResponse[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

//     const columns:  ColumnDef<ApiResponse>[]= [
//         columnHelper.accessor('factors', {
//         cell: info => info.getValue(),
//         footer: info => info.column.id,
//         }),
//         columnHelper.accessor('items', {
//         cell: info => info.getValue(),
        
//         })

//   ]

  const columns:  ColumnDef<ApiResponse>[] = [
    {
        header: 'factors',
        footer: props => props.column.id,
        columns: [
            {
              accessorKey: 'factors',
              cell: info => info.getValue()
            }]
        }
    ]

    async function fetchData() {
        try {
          const response = await axios.get<ApiResponse>('https://localhost:7225/API/board={id}?boardId=1');
          const data = response.data;
      
          // Access the data
          console.log([data]);
 
          setMyData([data]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    // const [data, setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]


    const newTable = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })
  
    return (
      <div className="p-2">
        <table>
          <thead>
            {newTable.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {newTable.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
         
        </table>
        <div className="h-4" />
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>
      </div>
    )
  }

export default Table