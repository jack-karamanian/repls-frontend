import * as React from 'react';
import * as xterm from 'xterm';

import API from './API';

interface TerminalProps {
    image: string;
}

interface TerminalState {
    terminal: xterm;
}

class Terminal extends React.Component<TerminalProps, TerminalState> {
    state: TerminalState = {
        terminal: new xterm(),
    };

    componentDidMount() {
        
        // this.state.terminal.loadAddon('fit');
        const element = document.getElementById('#terminal') as HTMLElement;
        // if (element !== null) {
        this.state.terminal.open(element);

        this.state.terminal.on('lineFeed', () => {
            this.state.terminal.scrollDisp(1);
        });
        
        const ws = API.startImage(this.props.image);

        ws.onmessage = (ev) => {
            this.state.terminal.write(ev.data);
        };

        ws.onopen = () => {
            // ws.send('asdf');
            this.state.terminal.on('key', (key) => {
                ws.send(key);
            });
        }

        // }
    }

    render() {
        return (
            <div id="terminal">
            </div>
        );
    }

}

export default Terminal;