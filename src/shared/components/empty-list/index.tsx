import React from 'react'
import SimpleText from '../text/simple-text'
import styles from './styles';

function EmptyList(): JSX.Element {

    return (
        <div style={styles.container}>
            <img style={styles.image}
                src={require('../../../assets/images/no-data.svg')} />
            <SimpleText additionalStyle={styles.text} textID='nothing-to-show' />
        </div>
    )
}
export default EmptyList;