import React, { Component, PropTypes } from 'react';
import SHOP_DATA from './shopdata.js';
import PreviewCollection from '../../components/preview-collection/preview-collection';

class ShopPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	collections: SHOP_DATA

        }
    }

    render() {
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {
                    collections.map(({ id, ...otherCollectionProps }) => (
                        <PreviewCollection key={id} {...otherCollectionProps} />
                        ))
                }
            </div>
        );
    }
}

export default ShopPage;
