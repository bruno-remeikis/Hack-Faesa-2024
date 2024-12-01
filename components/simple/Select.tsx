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
    className?: string;
}

export function Select({ placeholder, label, items, className = '' }: SelectProps) {
    return (
      <SelectUi>
        <SelectTrigger className={className}>
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