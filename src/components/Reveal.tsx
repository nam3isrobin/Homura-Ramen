import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
} & HTMLMotionProps<'div'>

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
