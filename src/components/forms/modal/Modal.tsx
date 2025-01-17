import {FC} from 'react';
import ReactDOM from 'react-dom';

const Model:FC = () => {
    const modelModal = document.getElementById('portal') as HTMLElement;

    return ReactDOM.createPortal(
        <div>
            
        </div>,
        modelModal
    );
};

export default Model;