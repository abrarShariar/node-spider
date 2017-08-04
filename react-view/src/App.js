import React, {Component} from 'react';
import './App.css';
import HttpService from './services/HttpService';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }

    componentWillMount() {
        HttpService.getAllNews().then((res) => {
            if(res.status === 200){
                this.setState({
                    news: res.data["data"]
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="App">
            {this.state.news.map((item)=>{
                return <li>{item}</li>
            })}
                <div>
                    Hello WOrld
                </div>
            </div>
        );
    }
}

export default App;
