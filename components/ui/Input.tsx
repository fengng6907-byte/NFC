'use client'
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  error?: string
  hint?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-navy-800">
            {label}
            {props.required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
              {prefix}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              'w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-navy-800 placeholder-gray-400',
              'transition-all duration-150 outline-none',
              'border-navy-800/10 hover:border-navy-800/20',
              'focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
              error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/20',
              prefix && 'pl-9',
              suffix && 'pr-9',
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 text-gray-400 flex items-center pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-navy-800">{label}</label>
      )}
      <select
        className={twMerge(
          'w-full bg-white border border-navy-800/10 rounded-xl px-4 py-2.5 text-sm text-navy-800',
          'transition-all duration-150 outline-none appearance-none cursor-pointer',
          'hover:border-navy-800/20 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
          error && 'border-rose-400',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-navy-800">{label}</label>
        )}
        <textarea
          ref={ref}
          className={twMerge(
            'w-full bg-white border border-navy-800/10 rounded-xl px-4 py-3 text-sm text-navy-800 placeholder-gray-400',
            'transition-all duration-150 outline-none resize-none',
            'hover:border-navy-800/20 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
            error && 'border-rose-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
