import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'disabled:opacity-50 inline-flex items-center gap-1.5 text-xs font-medium',

  variants: {
    variant: {
      default:
        'py-1.5 px-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700',
      primary:
        'py-1 px-2 rounded-full bg-teal-400 text-teal-950 hover:bg-teal-500',
    },
    size: {
      default: '',
      icon: 'p-1.5',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, size, className })} />
}
