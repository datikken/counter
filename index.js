import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);

const initModel = 0;

function view(dispatch, model) {
    return div([
        div(`Count: ${model}`),
        button({ onclick: () => dispatch(msgs.add) }, '+'),
        button({ onclick: () => dispatch(msgs.subtract) }, '-'),
    ])
}

const msgs = {
    add: 'add',
    subtract: 'subtract'
};

function update(msg, model) {
    switch(msg) {
        case msgs.add:
            return model + 1;
        case msgs.subtract: 
            return model - 1;
        default: 
            return model;
    }
}

//impure code
function app(initalModel, update, view, node) {
    
    let model = initalModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);

    node.appendChild(rootNode);

    function dispatch(msg) {
        model = update(msg, model);
        
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);

        rootNode = patch(rootNode, patches);

        currentView = updatedView;
    }
}

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);