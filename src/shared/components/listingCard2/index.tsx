import React from 'react'
import Button from '../button'
import SimpleText from '../text/simple-text'
import styles from './styles'
interface ListingCardProps {

    image: string,
    data: JSON
    //things

}
// use with a container with such styles
// style={{ display: "flex", flexDirection: "row" }}
function ListingCard2(props: ListingCardProps): JSX.Element {

    return (
        <div style={styles.card}>
            <div style={styles.indexContainer}>
                <SimpleText textID="1" additionalStyle={styles.text} />

            </div>
            <img src={props.image} style={styles.image} />
            <SimpleText textID="prop1 Data Text" additionalStyle={styles.text} />
            <SimpleText textID="prop2 Data Text" additionalStyle={styles.text} />
            <SimpleText textID="prop3 Data Text" additionalStyle={styles.text} />
            <SimpleText textID="prop4 Data Text" additionalStyle={styles.text} />
            <SimpleText textID="prop5 Data Text" additionalStyle={styles.text} />

            <Button buttonStyle={styles.button} onPress={() => console.log('1')}>•••</Button>

        </div>

    )
}

export default ListingCard2