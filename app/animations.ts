import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export const staggerChildren = (staggerTime: number = 0.1): Variants => ({
  animate: {
    transition: {
      staggerChildren: staggerTime
    }
  }
})

export const fadeInUpWithDelay = (delay: number): Variants => {
  const transition = { ...fadeInUp.transition, delay };
  return {
    ...fadeInUp,
    transition
  };
}