import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

class CalcScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            result: 0,
            displayText: '',
            stagingValue: '',
            value: [],
            opt: []
        }
    }
    
    _handleValue = (value) => {
        if (this.state.result > 0) {
            if (value === "0") {
                this.setState({
                    stagingValue: '',
                    displayText: '',
                    value: [],
                    result: 0
                })
            } else {
                this.setState({
                    stagingValue: value,
                    displayText: value,
                    value: [],
                    result: 0
                })
            }
        } else {
            this.setState({
                stagingValue: this.state.stagingValue + value,
                displayText: this.state.displayText + value,
                result: 0
            })
        }
    }

    _handleBackSpace = () => {
        if (this.state.result > 0) {
            var tempResult = JSON.stringify(this.state.result);
            this.setState({
                displayText: tempResult.slice(0, tempResult.length - 1),
                stagingValue: tempResult.slice(0, tempResult.length - 1),
                result: 0
            })
        } else if (this.state.displayText === '' && this.state.stagingValue === '') {
            return null;
        } else if (this.state.stagingValue === '') {
            const stagingValueState = this.state.value[this.state.value.length - 1];
            const optState = this.state.opt.splice(this.state.opt.length - 1, 0);
            const displayTextState = this.state.displayText.slice(0, this.state.displayText.length - 3);
            this.setState({
                opt: optState,
                displayText: displayTextState,
                stagingValue: stagingValueState
            })
        } else {
            const stagingValueState = this.state.stagingValue.slice(0, this.state.stagingValue.length - 1);
            const displayTextState = this.state.displayText.slice(0, this.state.displayText.length - 1);
            this.setState({
                stagingValue: stagingValueState,
                displayText: displayTextState
            })
        }
    }

    _handleOpt = (value) => {
        if (this.state.result > 0) {
            const valueArray = [...this.state.value];
            const optArray = [...this.state.opt];
            valueArray.push(JSON.stringify(this.state.result));
            optArray.push(value);
            this.setState({
                value: valueArray,
                stagingValue: '',
                opt: optArray,
                displayText: JSON.stringify(this.state.result) + " " + value + " ",
                result: 0
            })
        } else {
            const valueArray = [...this.state.value];
            const optArray = [...this.state.opt];
            valueArray.push(this.state.stagingValue);
            optArray.push(value);
            this.setState({
                value: valueArray,
                stagingValue: '',
                opt: optArray,
                displayText: this.state.displayText + " " + value + " "
            })
        }
    }

    _handleResult = () => {
        const valueArray = [...this.state.value];
        valueArray.push(this.state.stagingValue);
        this.setState({
            value: valueArray,
            stagingValue: ''
        }, () => this._handleCompute())
    }

    _handleCompute = () => {
        let result = 0;
        this.state.value.map((value, index) => {
            if (index === 0) {
                result = parseInt(value);
                if (this.state.value.length === 1) {
                    console.warn(this.state.value.length)
                    this.setState({
                        result: result,
                        value: [],
                        opt: [],
                        displayText: '',
                    })
                }
            } else {
                if (this.state.opt.length < index) {
                    this.setState({
                        result: result,
                        value: [],
                        opt: [],
                        displayText: '',
                    })
                } else {
                    var opt = this.state.opt[index - 1];
                    if (opt === "x") {
                        result = result * parseInt(value);
                    } else if (opt === "/") {
                        result = result / parseInt(value);
                    } else if (opt === "+") {
                        result = result + parseInt(value);
                    } else if (opt === "-") {
                        result = result - parseInt(value);
                    }
                    this.setState({
                        result: result,
                        value: [],
                        opt: [],
                        displayText: '',
                    })
                }
            }
        })
    }

    render() {
        return (
            <View style={styleScope.container}>
                <View style={styleScope.containerNotice}>
                    <Text style={styleScope.textNotice}>This calculator cannot process negative number.</Text>
                </View>
                <View style={styleScope.layerContainer}>
                    <View style={styleScope.mainLayerContainer}>
                        <Text style={styleScope.textLayer}>{ this.state.result > 0 ? this.state.result : this.state.displayText !== '' ? this.state.displayText : 0 }</Text>
                    </View>
                </View>
                <View style={styleScope.keyboardContainer}>
                    <View style={styleScope.buttonContainer}>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("1")}>
                            <Text style={styleScope.textKeyboard}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("2")}>
                            <Text style={styleScope.textKeyboard}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("3")}>
                            <Text style={styleScope.textKeyboard}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleBackSpace()}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF', textAlignVertical: 'top'}]}>{"_<"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleScope.buttonContainer}>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("4")}>
                            <Text style={styleScope.textKeyboard}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("5")}>
                            <Text style={styleScope.textKeyboard}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("6")}>
                            <Text style={styleScope.textKeyboard}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleOpt("x")}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF'}]}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleScope.buttonContainer}>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("7")}>
                            <Text style={styleScope.textKeyboard}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("8")}>
                            <Text style={styleScope.textKeyboard}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("9")}>
                            <Text style={styleScope.textKeyboard}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleOpt("/")}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF'}]}>/</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleScope.buttonContainer}>
                        <TouchableOpacity style={styleScope.button} onPress={() => this._handleValue("0")}>
                            <Text style={styleScope.textKeyboard}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleOpt("+")}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF'}]}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleOpt("-")}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF'}]}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styleScope.button, {backgroundColor: '#FC87F0'}]} onPress={() => this._handleResult()}>
                            <Text style={[styleScope.textOpt, {color: '#FFFFFF'}]}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styleScope = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    containerNotice: {
        padding: 8,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFF365'
    },
    layerContainer: {
        flex: 1,
        padding: 16,
    },
    mainLayerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderBottomColor: '#FC87F0',
        padding: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    keyboardContainer: {
        minHeight: 320,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },
    buttonContainer: {
        height: 60,
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    }, 
    textKeyboard: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#FC87F0'
    },
    textOpt: {
        fontFamily: 'Arial',
        fontSize: 25,
        color: '#000000'
    },
    textLayer: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#A6ACAF'
    },
    textNotice: {
        fontFamily: 'Arial',
        fontSize: 14,
        color: '#A6ACAF'
    }
})
export default CalcScreen;