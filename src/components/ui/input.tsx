import { ComponentProps, createContext, ReactNode, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  slots: {
    root: 'border border-zinc-700 bg-zinc-800/50',
    control: 'placeholder-zinc-500 text-zinc-100',
  },

  variants: {
    variant: {
      default: {},
      filter: {
        root: 'rounded-full py-1.5 px-3 flex items-center gap-1.5 text-xs text-zinc-500 leading-tight border-dashed focus-within:border-zinc-600',
        control: 'bg-transparent flex-1 outline-none',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const inputContext = createContext({} as VariantProps<typeof input>)

export function Input({
  children,
  variant,
}: { children: ReactNode } & VariantProps<typeof input>) {
  const { root } = input({ variant })

  return (
    <inputContext.Provider value={{ variant }}>
      <div className={root()}>{children}</div>
    </inputContext.Provider>
  )
}

export interface ControlProps extends ComponentProps<'input'> {}

export function Control({ className, ...props }: ControlProps) {
  const { variant } = useContext(inputContext)
  const { control } = input({ variant })

  return <input className={control({ className })} {...props} />
}
