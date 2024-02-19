import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
  return (
    <table
      {...props}
      className={twMerge(
        'w-full text-sm border-t-2 border-b-2 border-zinc-800',
        props.className,
      )}
    />
  )
}

interface TableHeaderProps extends ComponentProps<'thead'> {}

export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} />
}

interface TableHeadProps extends ComponentProps<'th'> {}

export function TableHead(props: TableHeadProps) {
  return (
    <th
      {...props}
      className={twMerge(
        'text-left py-3 px-4 font-medium text-zinc-300',
        props.className,
      )}
    />
  )
}

interface TableBodyProps extends ComponentProps<'tbody'> {}

export function TableBody(props: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={twMerge(
        '[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-800/50',
        props.className,
      )}
    />
  )
}

interface TableRowProps extends ComponentProps<'tr'> {}

export function TableRow(props: TableRowProps) {
  return (
    <tr
      {...props}
      className={twMerge('border-b border-zinc-800', props.className)}
    />
  )
}

interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell(props: TableCellProps) {
  return <td {...props} className={twMerge('py-3 px-4', props.className)} />
}
