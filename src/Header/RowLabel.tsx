'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  let label = 'Row'

  if (data?.data?.type === 'dropdown' && data?.data?.label) {
    label = `Dropdown ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.label}`
  } else if (data?.data?.link?.label) {
    label = `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
  }

  return <div>{label}</div>
}
