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
    selectedItem: string,
    placeholder: string,
    showLabel?: boolean,
    label?: string,
    required?: boolean,
    containerStyle?: CSSProperties,
    onSelectItem: (value: string) => void
}

function Picker(props: PickerProps): JSX.Element {
    const { pickerItems, selectedItem, placeholder, showLabel, label, required, containerStyle, onSelectItem } = props;
    const [opened, setOpened] = useState<boolean>(false);

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
            <Button buttonStyle={styles.innerContainer}
                onPress={() => setOpened(!opened)}
            >
                <SimpleText
                    text={selectedItem ? pickerItems.find(item => item.value == selectedItem)?.label : placeholder}
                    additionalStyle={styles.selectedItem}
                />
                <Rotatable rotate={opened}>
                    <ArrowDown size={24} color={APP_COLORS.lightGray} />
                </Rotatable>
                {/* {
                    opened ? (
                        <ArrowUp size={24} color={APP_COLORS.lightGray} />
                    ) : (
                        <ArrowDown size={24} color={APP_COLORS.lightGray} />
                    )
                } */}
            </Button>
            {
                opened && (
                    <div style={styles.openedPicker} className='picker'>
                        {
                            pickerItems.map(item => (
                                <Button buttonStyle={styles.pickerItem} onPress={() => { onSelectItem(item.value) }}>
                                    <SimpleText additionalStyle={styles.pickerItemText} text={item.label} />
                                    {
                                        item.value == selectedItem && (
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