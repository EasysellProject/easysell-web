import React, { useRef } from 'react';
import Button from '../button';
import SimpleText from '../text/simple-text';
import styles from './styles';

interface FilePickerProps {
    title?: string;
    onFileChosen: (file: File) => void
}

function FilePicker(props: FilePickerProps): JSX.Element {
    const { onFileChosen } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    function onChooseFilePressed(event): void {
        console.log('file chooser ', event.target.files)
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            onFileChosen(img);
        }
    }

    return (
        <div style={styles.container}>
            {/* <SimpleText
                textID='image'
                additionalStyle={styles.header}
            /> */}
            <div style={styles.innerContainer}>
                <div style={{ flex: 1 }}>

                </div>
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    onChange={onChooseFilePressed}
                    style={{ display: 'none' }}
                />
                <Button buttonStyle={styles.chooseFileButton} onPress={() => inputRef.current?.click()}>
                    <SimpleText additionalStyle={styles.chooseFileText} text="Choose File" />
                </Button>
            </div>

        </div>
    )
}
export default FilePicker