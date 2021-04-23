import React, { CSSProperties, useState } from 'react'
import { IoIosArrowDown as ArrowDown, IoIosArrowUp as ArrowUp } from 'react-icons/io';
import { MdDone as Done } from 'react-icons/md';
import { APP_COLORS } from '../../styles';
import Button from '../button';
import SimpleText from '../text/simple-text';
import styles from './styles';
import './picker.css';
import Rotatable from '../rotatable';

type PickerItem = {
    value: string,
    label: string
}

interface PickerProps {
    pickerItems: PickerItem[],
    multiple?: boolean
    selectedItems: string[],
    placeholder: string,
    showLabel?: boolean,
    label?: string,
    required?: boolean,
    containerStyle?: CSSProperties,
    onSelectItem: (value: string) => void
}

function Picker(props: PickerProps): JSX.Element {
    const { pickerItems, selectedItems, multiple, placeholder, showLabel, label, required, containerStyle, onSelectItem } = props;
    const [opened, setOpened] = useState<boolean>(false);
    const [update, setUpdate] = useState(0);

    return (
        <div style={{
            ...styles.container,
            ...containerStyle
        }}>
            {
                showLabel && label && (
                    <SimpleText
                        textID={label}
                        required={required}
                        capitalized
                        additionalStyle={styles.pickerLabel}
                    />
                )
            }
            <Button buttonStyle={{ ...styles.innerContainer, height: containerStyle?.height || 36 }}
                onPress={() => setOpened(!opened)}
            >
                {
                    selectedItems?.length > 0 && pickerItems.filter(item => selectedItems?.some(i => i == item.value)).length > 0 ? (
                        <SimpleText
                            text={pickerItems.filter(item => selectedItems?.some(i => i == item.value))?.map(selectedItem => selectedItem.label).join(', ')}
                            additionalStyle={styles.selectedItem}
                        />
                    ) : (
                        <SimpleText
                            textID={placeholder}
                            additionalStyle={styles.selectedItem}
                        />
                    )
                }
                <Rotatable rotate={opened}>
                    <ArrowDown size={24} color={APP_COLORS.lightGray} />
                </Rotatable>
            </Button>
            {
                opened && (
                    <div style={styles.openedPicker} className='picker'>
                        {
                            pickerItems.map(item => (
                                <Button buttonStyle={styles.pickerItem} onPress={() => {
                                    setUpdate(update + 1) // re render picker
                                    onSelectItem(item.value)
                                }}>
                                    <SimpleText additionalStyle={styles.pickerItemText} text={item.label} />
                                    {
                                        multiple ? (
                                            selectedItems?.some(i => i == item.value) && (
                                                <Done color={APP_COLORS.BUTTONS.darkGray} size={24} />
                                            )
                                        ) : item.value == selectedItems[0] && (
                                            <Done color={APP_COLORS.BUTTONS.darkGray} size={24} />
                                        )
                                    }
                                </Button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
export default Picker