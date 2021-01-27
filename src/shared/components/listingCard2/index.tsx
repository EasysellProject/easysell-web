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
            <img src={props.image} style={styles.image} />
            <SimpleText textID="prop1 Data Json Text" additionalStyle={styles.text} />
            <SimpleText textID="prop2 Data Json Text" additionalStyle={styles.text} />
            <SimpleText textID="prop3 Data Json Text" additionalStyle={styles.text} />
            <SimpleText textID="prop4 Data Json Text" additionalStyle={styles.text} />
            <SimpleText textID="prop5 Data Json Text" additionalStyle={styles.text} />

            <Button buttonStyle={styles.button} onPress={() => console.log('1')}>Button Text1</Button>

        </div>

    )
}

export default ListingCard2