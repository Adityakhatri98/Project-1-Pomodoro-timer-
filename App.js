import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { vibrate } from './utils'
import { Audio } from 'expo-av';
import Setter from './setNewTimer'

Audio.setIsEnabledAsync(true)



class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.resetTimer()
    this.interval
    this.state = {
      btnStart: false,
      btnStop: true,
      ...this.props.workTime,
      work: { ...this.props.workTime },
      break: { ...this.props.breakTime },
    }
  }
  toggleTimer = () => {
    if (this.state.message === "Work Time") {
      console.log("Toogle to break")
      this.setState({
        ...this.state.break,
      })
    } else {
      console.log("again toogle")
      this.setState({
        ...this.state.work,
      })
    }
  }


  timer = () => {
    if (!this.state.minutes == 0 & this.state.secondes <= 0) {
      this.setState(prevState => ({
        secondes: 60,
        minutes: prevState.minutes - 1,
      }))
    }
    if (this.state.minutes === 0 & this.state.secondes === 0) {
      vibrate()
      // const tick = new UIfx({asset: tickAudio});
      // tick.play();
      // sound.play();
      
      try {
        const { sound: soundObject, status } = Audio.Sound.createAsync(
          require('./my-sounds/beep-06.mp3'),
          { shouldPlay: true }
        );
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
      clearInterval(this.interval)
      this.toggleTimer()
      this.interval = setInterval(this.timer, 1000)
    }
    else {
      this.setState(prevState => ({
        secondes: prevState.secondes - 1,
      }))
    }
  }
  startTimer = () => {
    console.log("Timer Start button")
    this.setState({
      btnStart: true,
      btnStop: false
    })
    this.interval = setInterval(this.timer, 1000)
  }

  pauseTimer = () => {
    console.log("Timer pause button")
    this.setState({
      btnStart: false,
      btnStop: true
    })
    clearInterval(this.interval)
  }

  resetTimer = () => {
    console.log("Timer reset button")
    clearInterval(this.interval)
    this.setState({
      btnStart: false,
      btnStop: true,
      ...this.props.workTime,
    })
  }






  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.font} >{this.state.message}</Text>
        <Text style={styles.font}>{this.state.minutes}:{this.state.secondes}</Text>
        <View style={styles.horizontal}>
          <Button title="Start" onPress={this.startTimer} disabled={this.state.btnStart}></Button>
          <Button title="Pause" onPress={this.pauseTimer} disabled={this.state.btnStop}></Button>
          <Button title="Restart" onPress={this.resetTimer}></Button>
        </View>


      </View>
    )
  }
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      new: true,
      def: true,
      work: {
        minutes: Number(25),
        secondes: Number(0),
        message: "Work Time"
      },
      break: {
        minutes: Number(5),
        secondes: Number(0),
        message: "Break Time"
      }
    }
  }


  handelNewTime = (NewTime) => {

    this.setState({

      new: !this.state.new,
      work: {
        minutes: NewTime.work.minutes,
        secondes: NewTime.work.secondes,
        message: "Work Time",
      },
      break: {
        minutes: NewTime.break.minutes,
        secondes: NewTime.break.secondes,
        message: "Break Time",
      }
    })
    setTimeout(() => {
      this.setState({
        new: !this.state.new,
      })
    }, 100);


    // {Counter.resetTimer}
    // console.error(this.state.work.minutes)
  }

  defa = () => {

    this.setState({

      def: !this.state.def,
      work: {
        minutes: 25,
        secondes: 0,
        message: "Work Time",
      },
      break: {
        minutes: 5,
        secondes: 0,
        message: "Break Time",
      }
    })
    setTimeout(() => {
      this.setState({
        def: !this.state.def,
      })
    }, 100);

  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container1}>
        {/* <ScrollView style={{flex:1,}}> */}
        {this.state.def ?
          <KeyboardAvoidingView style={styles.container1}>
            {this.state.new ?
              <Counter workTime={this.state.work} breakTime={this.state.break} />
              :
              []
            }

            <Setter works={this.state.work} breaks={this.state.break} onSubmit={this.handelNewTime} />
            <View>
              <Button title="Default" onPress={this.defa} />
            </View>

            {/* </ScrollView> */}

          </KeyboardAvoidingView>
          :
          []
        }

      </KeyboardAvoidingView>
    );
    // }

  }
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: "row",

  },
  font: {
    fontSize: 70
  },
  input: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
});
