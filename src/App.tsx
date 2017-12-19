import * as React from 'react';
// import * as logo from './logo.svg';
import './App.css';
// import "../node_modules/xterm.js/dist/xterm.css";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Select from 'material-ui/Select';
import Terminal from './Terminal';
import API from './API';
import ImageEntry from './types/ImageEntry';
import { MenuItem } from 'material-ui';

interface AppState {
    images: ImageEntry[];
    selectedImage: string | null;
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        images: [],
        selectedImage: null,
    }
    componentWillMount() {
        this.getImages();
    }

    async getImages() {
        const images: ImageEntry[] = await API.getImages();
        this.setState({ images });
    }

    onImageChange = (ev: any) => {
        this.setState({selectedImage: ev.target.value })
    }

    render() {
        let imageMenuItems: JSX.Element[] = [];
        if (this.state.images !== null) {
            imageMenuItems = this.state.images.map((image: ImageEntry) => {
                return (
                    <MenuItem value={image.imageName} >
                        {image.displayName}
                    </MenuItem>
                );
            });

        }

        return (
            <div className="App">
                <AppBar position='static' color='accent'>
                    <Toolbar>
                        <Select value={this.state.selectedImage || ''} onChange={this.onImageChange}>
                            {imageMenuItems}
                        </Select>
                    </Toolbar>
                </AppBar>
                {this.state.selectedImage !== null && <Terminal image={this.state.selectedImage} />}
            </div>
        );
    }
}

export default App;
