import React, { Component } from "react";
import $ from "jquery";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beats: [
                {id: 'Q',  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: "Heater 1"},
                {id: 'W',  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: "Heater 2" },
                {id: 'E', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: "Heater 3"},
                {id: 'A', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: "Heater 4"},
                {id: 'S', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: "Clap"},
                {id: 'D', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: "Open-HH" },
                {id: 'Z', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: "Kick-n'-Hat"},
                {id: 'X', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: "Kick"},
                {id: 'C', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: "Closed-HH"}
            ],
            display: ""
        }
    }

    jQuerycode = () => {
        $("body").keypress(function(e) {
            let keyCode = e.keyCode;
            let charAddedClass = "";

            switch(keyCode) {
                case 113:
                    charAddedClass = "Q";
                    break;
                case 119:
                    charAddedClass = "W";
                    break;
                case 101:
                    charAddedClass = "E";
                    break;
                case 97:
                    charAddedClass = "A";
                    break;
                case 115:
                    charAddedClass = "S";
                    break; 
                case 100:
                    charAddedClass = "D";
                    break;
                case 122:
                    charAddedClass = "Z";
                    break;
                case 120:
                    charAddedClass = "X";
                    break;
                case 99:
                    charAddedClass = "C";
                    break;
                default:
                    charAddedClass = "";
                    break;
            }

            $("#" + charAddedClass + "-pad").addClass("active").siblings().removeClass("active");
            
        });

        $(".drum-pad").click(function(e) {
            let clickedKey = e.target.innerText;

            $("#" + clickedKey + "-pad").addClass("active").siblings().removeClass("active");

        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey);
        this.jQuerycode();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey);
    }

    soundAdd = (act) => {
        if(typeof act != 'string') {
            act = act.target.innerText;
        }

        let regex = /^[Q|W|E|A|S|D|Z|X|C]$/
        console.log();

        if(regex.test(act)) {
            document.getElementById(act).play();
        } else {
            document.getElementById(act).pause();
        }  

        let note = this.state.beats.find((beat) => {
            return beat.id === act;
        })

       this.setState({
            beats: [...this.state.beats],
            display: note.name
        }) 
     }

    handleClick = (e) => {
        let clickedDiv = e.target.innerText;
        console.log('clickedDiv', clickedDiv);

        this.soundAdd(clickedDiv);
    }

    handleKey = (e) => {
        let keyPress = e.key;
        this.soundAdd(keyPress.toUpperCase());
    }
    
    render() {
        const  { beats } = this.state;
        
        return (
            <div className="container-fluid" id="drum-machine">
                <h1 className="text-center">Drum Machine</h1>
                <div className="container col-sm-12">
                    <div className="text-center" id="display" >
                    { this.state.display }
                    </div>
                    <div className="grid-con">
                        {
                            beats.map(beat => {
                                return (
                                    <div className="drum-pad text-center" id={ beat.id + "-pad" } onClick={this.soundAdd}  key={beat.id} > { beat.id }
                                        <audio className="clip" id={beat.id} src={beat.url}> </audio>
                                    </div>
                                )
                            })
                        }

                           
                    </div> 
                </div>
                <div className="text-center">
                    <p>Get the code <a href="https://github.com/wdbsa/drum-machine" rel="nofollow noreferrer" target="_blank">here</a></p>
                </div>
            </div>
        )
    }
   
}

export default Main;