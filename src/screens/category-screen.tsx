import React from "react"
import { Center, Text } from "native-base";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'


export default function CategoryScreen() {
    return (
        <Center>
            <Text>Category</Text>
            <FontAwesomeIcon icon={faMugSaucer} />
        </Center>

    );
}