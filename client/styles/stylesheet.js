import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    splash: {
        backgroundColor: 'orange'
    },
    splashFont: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold"
    },
    form: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'stretch'
    },
    input: {
        fontSize: 20,
        height: 50,
        borderStyle: "solid",
        borderColor: "grey",
        borderRadius: 3,
        borderWidth: 1,
        padding: 6,
    },
    label: {
        marginTop: 13,
        marginBottom: 4,
        fontSize: 20
    },
    loginButton: {
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "#2196f3",
        padding: 10,
        marginTop: 25
    },
    LoginButtonText: {
        fontSize: 20,
        color: "white"
    }
});
export default styles