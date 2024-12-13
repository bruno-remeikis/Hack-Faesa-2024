import { Dispatch, SetStateAction } from 'react';
import {
    Select as SelectUi,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem
} from '../ui/select';

export type SelectItemProps = {
    name: string;
    value: string;
}

export type SelectProps = {
    placeholder: string;
    label?: string;
    items: SelectItemProps[];
    setItem?: Dispatch<SetStateAction<string | null>>;
    disabled?: boolean;
    className?: string;
}

export function Select({ placeholder, label, items, setItem, disabled = false, className = '' }: SelectProps) {
    return (
      <SelectUi onValueChange={e => setItem && setItem(e)}>
        <SelectTrigger disabled={disabled} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{ label }</SelectLabel>}
            {items.map(item =>
                <SelectItem key={item.value} value={item.value}>{ item.name }</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </SelectUi>
    )
  }