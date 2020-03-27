import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from './../search-panel';
import PostStatusFilter from './../post-status-filter';
import PostList from './../post-list';
import PostAddForm from './../post-add-form';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: [{
                label: "Going to learn React", important: false, id: 1
            }, {
                label: "Another text content", important: false, id: 2
            }, {
                label: "And something else...", important: true, id: 3
            }]
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id),
            newData = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newData
            }
        })
    }

    addItem = (content) => {
        const newPost = {
            label: content,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
           const newData = [...data, newPost];
           return {data: newData};
        })
    }



    render() {
        return (
            <div className='app'>
            <AppHeader />
            <div className="search-panel d-flex">
                <SearchPanel />
                <PostStatusFilter />
            </div>
            <PostList posts={this.state.data} onDelete={this.deleteItem} />
            <PostAddForm onAdd={this.addItem} />
            </div>
        )}
}
