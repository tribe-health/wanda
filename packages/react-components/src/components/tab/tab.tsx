import {
  useEffect,
  useState,
  forwardRef,
  ReactNode,
  Children,
  cloneElement,
  isValidElement
} from 'react'
import clsx from 'clsx'
import { useUIDSeed } from 'react-uid'
import { TabItem } from './tab-item'
import { TabList, TabListProps } from './tab-list'
import { TabPanel, TabPanelProps } from './tab-panel'
import { Tabs as TabsWrapper } from './primitive-tab'
import { Polymorphic } from '@/components'

import styles from './tab.module.css'

/* -------------------------------------------------------------------------- */
/*                                  Tab.Root                                  */
/* -------------------------------------------------------------------------- */

/**
 * Tab.Root
 * Public api
 */
export type TabProps = PropsWithClass & {
  /**
   * Pass the children Tab.Panel components.
   */
  children: ReactNode;
  /**
   * Set the index of the tab to be selected.
   */
  state?: [number, React.Dispatch<React.SetStateAction<number>>];
  /**
   * Callback function called when the selected tab changes.
   */
  onChange?(index: number): void;
}

type TabComponent = React.ForwardRefExoticComponent<TabProps> & {
  Panel: React.ForwardRefExoticComponent<TabPanelProps>;
  Item: React.ForwardRefExoticComponent<Polymorphic.OwnProps<typeof TabItem>>;
  List: React.ForwardRefExoticComponent<TabListProps>;
}

/**
 * Tab.Root
 * Component
 */
export const Tab = forwardRef<HTMLDivElement, TabProps>(({
  children,
  className,
  state,
  onChange,
  ...otherProps
}, forwardedRef) => {
  const innerState = useState(0)
  const tabState = state || innerState
  const [currentTab] = tabState
  const seedID = useUIDSeed()

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(currentTab)
    }
  }, [currentTab, onChange])

  return (
    <div
      ref={forwardedRef}
      className={clsx(styles.Tab, className)}
      {...otherProps}
    >
      <TabsWrapper state={tabState}>

        {/**
         * Auto generate the list of triggers based on
         * children. Assign required ARIA attributes and ID's
         */}
        <TabList>
          {Children.map(children, (child, index) => isValidElement(child) && (
            <TabItem
              id={seedID('tab-item')}
              aria-controls={seedID('tab-panel')}
              icon={child.props.icon}
            >
              {child.props.label}
            </TabItem>
          ))}
        </TabList>

        {/**
         * Loop children to assign required ARIA attributes and ID's
         */}
        {Children.map(children, (child, index) => isValidElement(child) && cloneElement(
          child,
          {
            id: seedID('tab-panel'),
            'aria-labelledby': seedID('tab-item')
          }
        ))}

      </TabsWrapper>
    </div>
  )
}) as TabComponent

Tab.displayName = 'Tab'

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

Tab.Panel = TabPanel
Tab.Item = TabItem
Tab.List = TabList
