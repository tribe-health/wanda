import { Checkbox } from '@/components'
import styles from './table-checkbox.module.css'

export const TableCheckbox = ({ ...otherProps }) => (
  <Checkbox
    className={styles.TableCheckbox}
    dimension="small"
    {...otherProps}
  />
)
