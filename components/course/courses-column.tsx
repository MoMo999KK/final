'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserCourse } from '@prisma/client'
import Link from 'next/link'
 

export const Coursecolumns: ColumnDef<UserCourse>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
 
  {
    accessorKey: 'createdAt',
    header: 'created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
   
  {
    accessorKey: 'userId',
    header: 'CreatorId'
  },
 
 
  {
    id: 'actions',
    cell: ({ row }) => {
      const course = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>more info</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.id)}
            >
              Copy courseId ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View course</DropdownMenuItem>
           <Link href={`http://localhost:3000/adminstrator/courses/${course.id}`}><DropdownMenuItem>Edit/publish</DropdownMenuItem></Link> 
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]