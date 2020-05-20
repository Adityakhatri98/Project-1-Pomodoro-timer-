import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native';

export default class Setter extends React.Component {
    state = {
        work: {
            ...this.props.works
        },
        break: {
            ...this.props.breaks

        }
    }
    handelWorksMin = (min) => {
        // this.state.work.message=5
        this.setState({
            work: {
                minutes: Number(min),
                secondes: this.state.work.secondes
            }
        },this.handleSubmit)
        // console.error(this.state.work.minutes)
    }
    handelWorksSec = (sec) => {
        if (sec >= 60) {
            this.setState({
                work: {
                    minutes: this.state.work.minutes + Math.floor(Number(sec) / 60),
                    secondes: Number(sec % 60)
                }
            },this.handleSubmit)
        }
        else {
            // this.state.work.message=5
            this.setState({
                work: {
                    minutes: this.state.work.minutes,
                    secondes: Number(sec)
                }
            },this.handleSubmit)
        }
        // this.handleSubmit
        // console.error(this.state.work.minutes)
    }

    handelBreakMin = (min) => {
        // this.state.work.message=5
        this.setState({
            break: {
                minutes: Number(min),
                secondes: this.state.break.secondes
            }
        },this.handleSubmit)

        // console.error(this.state.break.minutes)
    }
    handelBreakSec = (sec) => {
        if (sec >= 60) {
            this.setState({
                break: {
                    minutes: this.state.break.minutes + Math.floor(Number(sec) / 60),
                    secondes: Number(sec % 60)
                }
            },this.handleSubmit)
        }
        else {
            // this.state.break.message=5
            this.setState({
                break: {
                    minutes: this.state.break.minutes,
                    secondes: Number(sec)
                }
            },this.handleSubmit)
        }
    }
    handleSubmit = () => {
        // console.error(this.state);

        this.props.onSubmit(this.state)
    }


    render() {
        return (
            <View>
                {/* For Work */}
                <View style={styles.horizontal}>
                    <Text style={{
                        fontSize: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 13,
                        paddingRight: 15,
                    }}>Work</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={this.state.work}
                        onChangeText={this.handelWorksMin}
                        placeholder="M" />
                    <Text style={{ fontSize: 40 }}> : </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='number-pad'
                        value={this.state.work}
                        onChangeText={this.handelWorksSec}
                        placeholder="S" />
                    {/* <View style={{ padding: 10 }}>
                        <Button title="Set" onPress={this.handleSubmit} ></Button>
                    </View> */}
                </View>
                {/* For Break */}
                <View style={styles.horizontal}>
                    <Text style={{
                        fontSize: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10
                    }}>Break
                        </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={this.state.work}
                        onChangeText={this.handelBreakMin}
                        placeholder="M" />
                    <Text style={{ fontSize: 40 }}> : </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={this.state.work}
                        onChangeText={this.handelBreakSec}
                        placeholder="S" />
                    {/* <View style={{ padding: 10 }}>
                        <Button title="Set" onPress={this.handleSubmit} ></Button>
                    </View> */}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    horizontal: {
        flexDirection: "row",

    },
    input: {
        padding: 17,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10
    },
});
