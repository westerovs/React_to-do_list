import React, {Component} from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import AddedItem from '../added-item'
import ItemStatusFilter from '../item-status-filter'
import './app.css'

export default class App extends Component {
    maxId = 100
    
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: ''
    }
    
    toggleProperty(arr, id, prop) {
        const idx = arr.findIndex(item => item.id === id)
        // update obj
        const oldItem = arr[idx]
        const newItem = {
            ...oldItem,
            [prop]: !oldItem[prop]
        }
        // construct new arr
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }
    
    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++
        }
    }
    
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(item => item.id === id)
            const newTodoData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]

            return {
                todoData: newTodoData
            }
        })
    }

    addedItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {
            const newTodoData = [...todoData, newItem]

            return {
                todoData: newTodoData
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }
    
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
        
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
    
    search = (arr, term) => {
        if (term.length === 0) return arr
        
        return arr.filter(item => item.label
            .toLowerCase()
            .indexOf(term) > -1)
    }
    
    onSearchChange = (term) => {
        this.setState({ term })
    }
    
    render() {
        const { todoData, term } = this.state
        const visibilityState = this.search(todoData, term)
        
        const done = todoData.filter(it => it.done).length
        const noDone = todoData.length - done
        
        return (
            <div className="todo-app">
                <AppHeader toDo={ noDone } done={ done } />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={ visibilityState }
                    onDeleted={ this.deleteItem }
                    onToggleDone={ this.onToggleDone }
                    onToggleImportant={ this.onToggleImportant }
                />
                <AddedItem onAddedItem={ this.addedItem } />
            </div>
        )
    }
}

