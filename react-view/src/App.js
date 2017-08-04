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
            if (res.status === 200) {
                this.setState({
                    news: res.data["data"]
                });
            }

            this.state.news.map((item) => {
                console.log(item);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {

        const newsItems = this.state.news.map((item) => {
           return(
               <div className="row">
                   <div className="col-sm-6 col-md-4">
                       <div className="thumbnail">
                           <img src={item.img} alt="..."/>
                               <div className="caption">
                                   <h3>
                                       <a href={item.url}>{item.title_text}</a>
                                   </h3>
                               </div>
                       </div>
                   </div>
               </div>
            )
        })


        return (
            <div className="App">
                <div>
                    {newsItems}
                </div>
            </div>
        );
    }
}

export default App;
